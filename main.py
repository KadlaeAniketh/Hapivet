# import asyncio
# from dotenv import load_dotenv
# from livekit.agents import AutoSubscribe, JobContext, WorkerOptions, cli, llm
# from livekit.agents.voice_assistant import VoiceAssistant
# from livekit.plugins import openai, silero
# from api import AssistantFnc

# load_dotenv()


# async def entrypoint(ctx: JobContext):
#     initial_ctx = llm.ChatContext().append(
#         role="system",
#         text=(
#             "You will interact with users via voice."
#             "Always respond with short and concise sentences." 
#             "Avoid unpronounceable punctuation."
#             "If the user asks tell me about yourself, always start your answer with I am"
#         ),
#     )
#     await ctx.connect(auto_subscribe=AutoSubscribe.SUBSCRIBE_ALL)
#     fnc_ctx = AssistantFnc()

#     assitant = VoiceAssistant(
#         vad=silero.VAD.load(),
#         stt=openai.STT(),
#         llm=openai.LLM(),
#         tts=openai.TTS(voice="alloy"),
#         chat_ctx=initial_ctx,
#         fnc_ctx=fnc_ctx,
#     )
#     assitant.start(ctx.room)

#     await asyncio.sleep(1)
#     await assitant.say("Hey, I’m Ai Talking from Hapivet Ai?", allow_interruptions=True)


# if __name__ == "__main__":
#     cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))



# import asyncio
# from dotenv import load_dotenv
# from livekit.agents import AutoSubscribe, JobContext, WorkerOptions, cli, llm
# from livekit.agents.voice_assistant import VoiceAssistant
# from livekit.plugins import openai, silero
# from livekit import rtc
# from api import AssistantFnc

# load_dotenv()


# async def entrypoint(ctx: JobContext):
#     initial_ctx = llm.ChatContext().append(
#         role="system",
#         text=(
#             "You will interact with users via voice and text."
#             "Always respond with short and concise sentences." 
#             "Avoid unpronounceable punctuation."
#             "If the user asks tell me about yourself, always start your answer with I am"
#         ),
#     )
#     await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)
#     fnc_ctx = AssistantFnc()

#     assistant = VoiceAssistant(
#         vad=silero.VAD.load(),
#         stt=openai.STT(),
#         llm=openai.LLM(),
#         tts=openai.TTS(voice="alloy"),
#         chat_ctx=initial_ctx,
#         fnc_ctx=fnc_ctx,
#     )
    
#     # Subscribe to data messages
#     @ctx.room.on("data_received")
#     async def on_data_received(data_packet: rtc.DataPacket, participant):
#         if participant and participant.identity != ctx.room.local_participant.identity:
#             await handle_data(data_packet, participant, assistant)
    
#     assistant.start(ctx.room)

#     await asyncio.sleep(1)
#     await assistant.say("Hey, I'm Ai Lonso. How can I assist you via voice or text?", allow_interruptions=True)


# async def handle_data(data_packet: rtc.DataPacket, participant: rtc.RemoteParticipant, assistant: VoiceAssistant):
#     """Handle incoming data packets (text messages)"""
#     try:
#         # Decode the message
#         message = data_packet.data.decode('utf-8')
#         print(f"Received text message from {participant.identity}: {message}")
        
#         # Add user message to chat context
#         assistant._chat_ctx.messages.append({
#             "role": "user", 
#             "content": message
#         })
        
#         # Get response from LLM
#         llm_stream = assistant._llm.chat(chat_ctx=assistant._chat_ctx)
#         response_text = ""
        
#         async for chunk in llm_stream:
#             response_text += chunk.choices[0].delta.content or ""
        
#         # Add assistant response to chat context
#         assistant._chat_ctx.messages.append({
#             "role": "assistant",
#             "content": response_text
#         })
        
#         print(f"Agent responding: {response_text}")
        
#         # Speak the response
#         await assistant.say(response_text, allow_interruptions=True)
        
#     except Exception as e:
#         print(f"Error handling text message: {e}")
#         import traceback
#         traceback.print_exc()


# if __name__ == "__main__":
#     cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))


# main.py
import asyncio
from dotenv import load_dotenv
from livekit.agents import AutoSubscribe, JobContext, WorkerOptions, cli, llm
from livekit.agents.voice_assistant import VoiceAssistant
from livekit.plugins import openai, silero
from api import AssistantFnc

load_dotenv()


async def entrypoint(ctx: JobContext):
    initial_ctx = llm.ChatContext().append(
        role="system",
        text=(
            "You are an AI veterinary assistant. "
            "Speak in short, clear, and kind sentences. "
            "Ask about the pet's condition first before discussing appointments. "
            "Avoid punctuation that sounds unnatural when spoken aloud."
        ),
    )

    await ctx.connect(auto_subscribe=AutoSubscribe.SUBSCRIBE_ALL)
    fnc_ctx = AssistantFnc()

    assistant = VoiceAssistant(
        vad=silero.VAD.load(),
        stt=openai.STT(),
        llm=openai.LLM(),
        tts=openai.TTS(voice='alloy'),
        chat_ctx=initial_ctx,
        fnc_ctx=fnc_ctx,
    )

    assistant.start(ctx.room)

    # Greeting
    await asyncio.sleep(1)
    await assistant.say("Hey there! I’m HapiVet AI. Let’s get to know your pet first.", allow_interruptions=True)

    # Sequentially ask all disease-related questions
    while not fnc_ctx._disease_info_collected:
        next_q = fnc_ctx.ask_next_question()
        await asyncio.sleep(0.5)
        await assistant.say(next_q, allow_interruptions=True)

        # Wait for voice reply
        user_answer = await assistant.listen()
        ack = fnc_ctx.record_answer(user_answer)
        await asyncio.sleep(0.1)
        await assistant.say(ack, allow_interruptions=True)

    # Once info is collected, ask for scheduling
    await asyncio.sleep(1)
    await assistant.say("Would you like me to book an appointment for your pet?", allow_interruptions=True)
    user_reply = await assistant.listen()

    if "yes" in user_reply.lower():
        await assistant.say(fnc_ctx.get_free_slot(), allow_interruptions=True)
        slot_reply = await assistant.listen()
        confirm_msg = fnc_ctx.confirm_appointment(slot_reply)
        await assistant.say(confirm_msg, allow_interruptions=True)
    else:
        await assistant.say("No problem! You can contact us anytime for scheduling.", allow_interruptions=True)


if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
