import { useState } from 'react';

const RobotUI = ({ onBack }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm AI Lonso, your F1 racing assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Hardcoded fallback responses
  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes('race') || input.includes('racing')) {
      return "F1 racing is all about precision, speed, and strategy! The 2025 championship has been incredible with Oscar Piastri leading. What would you like to know about racing?";
    } else if (input.includes('piastri') || input.includes('oscar')) {
      return "Oscar Piastri is our 2025 champion with 324 points and 7 race wins! His performance this season has been outstanding. Would you like to know more about his racing stats?";
    } else if (input.includes('stats') || input.includes('standings')) {
      return "The top 3 drivers are: 1. Oscar Piastri (324 pts), 2. Lando Norris (299 pts), 3. Max Verstappen (255 pts). McLaren has dominated this season!";
    } else if (input.includes('help') || input.includes('what can you do')) {
      return "I can help you with F1 racing information, championship standings, driver stats, race strategies, and general racing queries. Just ask me anything!";
    } else if (input.includes('hello') || input.includes('hi')) {
      return "Hello! Great to see you here! Ready to talk about F1 racing? 🏎️";
    } else {
      return "That's an interesting question! I'm here to help with F1 racing information. Feel free to ask about drivers, standings, races, or any F1-related topics!";
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // ✅ Try backend first
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: "default_session", // must match backend model
          message: inputText,            // must match backend model
        }),

      });

      if (!res.ok) throw new Error("Backend error");

      const data = await res.json();

      const botMessage = {
        id: messages.length + 2,
        text: data.reply || generateBotResponse(inputText), // fallback if empty
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // ❌ If backend fails → use hardcoded fallback
      const botMessage = {
        id: messages.length + 2,
        text: generateBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 border-b-2 border-red-600 py-4 px-6 shadow-2xl">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🤖</div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                AI Lonso Chat
              </h1>
              <p className="text-red-200 text-sm">Your F1 Racing Assistant</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 border border-red-600 hover:scale-105"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-6 flex flex-col">
        {/* Messages */}
        <div className="flex-1 bg-gray-900 bg-opacity-50 rounded-2xl p-6 mb-6 overflow-y-auto backdrop-blur-sm border border-red-800 shadow-2xl">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl px-6 py-4 ${message.sender === 'user'
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/50'
                        : 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg'
                      }`}
                  >
                    <p className="text-base leading-relaxed">{message.text}</p>
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 px-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl px-6 py-4 shadow-lg">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="bg-gray-900 bg-opacity-80 rounded-2xl p-4 backdrop-blur-sm border-2 border-red-800 shadow-2xl">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about F1 racing..."
              className="flex-1 bg-black bg-opacity-50 text-white px-6 py-4 rounded-xl border border-red-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 placeholder-gray-500"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${inputText.trim()
                  ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-900/50 hover:scale-105'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
            >
              <span>Send</span>
              <span className="text-xl">🚀</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotUI;
