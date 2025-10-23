# ## RAG Q&A Conversation With Formula1 Website Including Chat History
# import streamlit as st
# from langchain.chains import create_history_aware_retriever, create_retrieval_chain
# from langchain.chains.combine_documents import create_stuff_documents_chain
# from langchain_chroma import Chroma
# from langchain_community.chat_message_histories import ChatMessageHistory
# from langchain_core.chat_history import BaseChatMessageHistory
# from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
# from langchain_core.runnables.history import RunnableWithMessageHistory
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_text_splitters import RecursiveCharacterTextSplitter
# from langchain_community.document_loaders import WebBaseLoader
# from langchain_openai import ChatOpenAI
# import os

# from dotenv import load_dotenv
# load_dotenv()

# # Load API keys
# os.environ["HF_TOKEN"] = os.getenv("HF_TOKEN")
# openai_api_key = os.getenv("OPENAI_API_KEY")

# # Embeddings
# embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# ## set up Streamlit 
# st.title("Conversational RAG With Formula 1 Latest News")
# st.write("Ask questions about the latest Formula 1 news from the official site 🚦🏎️")

# ## Check if OpenAI API key is provided
# if openai_api_key:
#     llm = ChatOpenAI(openai_api_key=openai_api_key, model="gpt-4o-mini")  

#     # Chat interface
#     session_id = st.text_input("Session ID", value="default_session")

#     # statefully manage chat history
#     if 'store' not in st.session_state:
#         st.session_state.store = {}

#     # Load Formula 1 website content
#     loader = WebBaseLoader("https://www.formula1.com/en/latest")
#     documents = loader.load()

#     # Split and create embeddings
#     text_splitter = RecursiveCharacterTextSplitter(chunk_size=1500, chunk_overlap=200)
#     splits = text_splitter.split_documents(documents)
#     vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings)
#     retriever = vectorstore.as_retriever()

#     # Contextualize questions
#     contextualize_q_system_prompt = (
#         "Given a chat history and the latest user question "
#         "which might reference context in the chat history, "
#         "formulate a standalone question which can be understood "
#         "without the chat history. Do NOT answer the question, "
#         "just reformulate it if needed and otherwise return it as is."
#     )
#     contextualize_q_prompt = ChatPromptTemplate.from_messages(
#         [
#             ("system", contextualize_q_system_prompt),
#             MessagesPlaceholder("chat_history"),
#             ("human", "{input}"),
#         ]
#     )

#     history_aware_retriever = create_history_aware_retriever(llm, retriever, contextualize_q_prompt)

#     # Answer question
#     system_prompt = (
#         "You are an assistant for Formula 1 news Q&A. "
#         "Use the following pieces of retrieved context to answer "
#         "the question. If you don't know the answer, say that you don't know. "
#         "Keep the answer concise (max 4 sentences)."
#         "\n\n"
#         "{context}"
#     )
#     qa_prompt = ChatPromptTemplate.from_messages(
#         [
#             ("system", system_prompt),
#             MessagesPlaceholder("chat_history"),
#             ("human", "{input}"),
#         ]
#     )

#     question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
#     rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

#     def get_session_history(session: str) -> BaseChatMessageHistory:
#         if session_id not in st.session_state.store:
#             st.session_state.store[session_id] = ChatMessageHistory()
#         return st.session_state.store[session_id]

#     conversational_rag_chain = RunnableWithMessageHistory(
#         rag_chain, get_session_history,
#         input_messages_key="input",
#         history_messages_key="chat_history",
#         output_messages_key="answer"
#     )

#     # User question input
#     user_input = st.text_input("Your question:")
#     if user_input:
#         session_history = get_session_history(session_id)
#         response = conversational_rag_chain.invoke(
#             {"input": user_input},
#             config={
#                 "configurable": {"session_id": session_id}
#             }
#         )
#         st.write("Assistant:", response['answer'])
#         st.write("Chat History:", session_history.messages)
# else:
#     st.warning("Please set your OpenAI API Key in the .env file")from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_chroma import Chroma
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import WebBaseLoader
from langchain_openai import ChatOpenAI
from fastapi import FastAPI

import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# ----- CORS setup -----
origins = [
    "http://localhost:5173",  # React dev server
    "*",  # optional, allow all origins for testing
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----- Chat store -----
store = {}

# ----- Embeddings -----
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# ----- OpenAI -----
openai_api_key = os.getenv("OPENAI_API_KEY")
llm = ChatOpenAI(openai_api_key=openai_api_key, model="gpt-4o-mini")

# ----- Load Formula 1 news -----
loader = WebBaseLoader("https://www.formula1.com/en/latest")
documents = loader.load()

# ----- Split & embed -----
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1500, chunk_overlap=200)
splits = text_splitter.split_documents(documents)
vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings)
retriever = vectorstore.as_retriever()

# ----- Contextualize user questions -----
contextualize_q_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "Rephrase questions with context, don’t answer."),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)
history_aware_retriever = create_history_aware_retriever(llm, retriever, contextualize_q_prompt)

# ----- QA prompt -----
system_prompt = (
    "You are an assistant for Formula 1 news Q&A. "
    "Use the following pieces of retrieved context to answer. "
    "If you don't know, say 'I don’t know'. Keep answers short (max 4 sentences).\n\n{context}"
)
qa_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)

# ----- Build RAG chain -----
question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)


def get_session_history(session: str) -> BaseChatMessageHistory:
    if session not in store:
        store[session] = ChatMessageHistory()
    return store[session]


conversational_rag_chain = RunnableWithMessageHistory(
    rag_chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="chat_history",
    output_messages_key="answer"
)

# ----- Request format -----
class ChatRequest(BaseModel):
    session_id: str
    message: str

# ----- Chat endpoint -----
@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        session_history = get_session_history(req.session_id)

        # Step 1: Try RAG chain
        response = conversational_rag_chain.invoke(
            {"input": req.message},
            config={"configurable": {"session_id": req.session_id}}
        )

        rag_answer = response.get("answer", "").strip()
        if rag_answer and rag_answer.lower() != "i don’t know":
            return {"reply": rag_answer}

        # Step 2: Fallback — use OpenAI directly
        try:
            direct_llm = ChatOpenAI(openai_api_key=openai_api_key, model="gpt-4o-mini")
            openai_response = direct_llm.invoke(req.message)
            openai_answer = openai_response.content.strip()
            if openai_answer:
                return {"reply": openai_answer}
        except Exception as e:
            print("OpenAI fallback failed:", e)

        # Step 3: Final fallback — Hardcoded responses
        fallback_answers = {
            "race": "F1 racing is all about speed, strategy, and precision. Oscar Piastri is leading the 2025 championship.",
            "piastri": "Oscar Piastri is our 2025 champion with 324 points and 7 wins. He's performing outstandingly!",
            "stats": "Top 3 drivers: 1. Oscar Piastri (324 pts), 2. Lando Norris (299 pts), 3. Max Verstappen (255 pts).",
            "help": "I can provide F1 news, driver stats, standings, and race insights. Ask me anything!",
            "hello": "Hello! Ready to talk F1 racing? 🏎️"
        }

        user_input = req.message.lower()
        for key, val in fallback_answers.items():
            if key in user_input:
                return {"reply": val}

        # Step 4: If no fallback works
        return {"reply": "I don’t know."}

    except Exception as e:
        print("Error in /chat:", e)
        return {"reply": "I don’t know."}
