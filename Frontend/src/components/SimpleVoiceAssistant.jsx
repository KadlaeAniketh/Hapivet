// import {
//   useVoiceAssistant,
//   BarVisualizer,
//   VoiceAssistantControlBar,
//   useTrackTranscription,
//   useLocalParticipant,
// } from "@livekit/components-react";
// import { Track } from "livekit-client";
// import { useEffect, useState } from "react";
// import "./SimpleVoiceAssistant.css";

// const Message = ({ type, text }) => {
//   return (
//     <div className="message">
//       <strong className={`message-${type}`}>
//         {type === "agent" ? "Agent: " : "You: "}
//       </strong>
//       <span className="message-text">{text}</span>
//     </div>
//   );
// };

// const SimpleVoiceAssistant = () => {
//   const { state, audioTrack, agentTranscriptions } = useVoiceAssistant();
//   const localParticipant = useLocalParticipant();
//   const { segments: userTranscriptions } = useTrackTranscription({
//     publication: localParticipant.microphoneTrack,
//     source: Track.Source.Microphone,
//     participant: localParticipant.localParticipant,
//   });

//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const allMessages = [
//       ...(agentTranscriptions?.map((t) => ({ ...t, type: "agent" })) ?? []),
//       ...(userTranscriptions?.map((t) => ({ ...t, type: "user" })) ?? []),
//     ].sort((a, b) => a.firstReceivedTime - b.firstReceivedTime);
//     setMessages(allMessages);
//   }, [agentTranscriptions, userTranscriptions]);

//   return (
//     <div className="voice-assistant-container">
//       <div className="visualizer-container">
//         <BarVisualizer state={state} barCount={7} trackRef={audioTrack} />
//       </div>
//       <div className="control-section">
//         <VoiceAssistantControlBar />
//         <div className="conversation">
//           {messages.map((msg, index) => (
//             <Message key={msg.id || index} type={msg.type} text={msg.text} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SimpleVoiceAssistant;

// import {
//   useVoiceAssistant,
//   BarVisualizer,
//   VoiceAssistantControlBar,
//   useTrackTranscription,
//   useLocalParticipant,
// } from "@livekit/components-react";
// import { Track } from "livekit-client";
// import { useEffect, useState, useRef } from "react";
// import { Send, Phone, Video, VideoOff } from 'lucide-react';

// const SimpleVoiceAssistant = () => {
//   const { state, audioTrack, agentTranscriptions } = useVoiceAssistant();
//   const localParticipant = useLocalParticipant();
//   const { segments: userTranscriptions } = useTrackTranscription({
//     publication: localParticipant.microphoneTrack,
//     source: Track.Source.Microphone,
//     participant: localParticipant.localParticipant,
//   });

//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');
//   const [isVideoOn, setIsVideoOn] = useState(false);
//   const videoRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     const allMessages = [
//       ...(agentTranscriptions?.map((t) => ({ ...t, type: "agent" })) ?? []),
//       ...(userTranscriptions?.map((t) => ({ ...t, type: "user" })) ?? []),
//     ].sort((a, b) => a.firstReceivedTime - b.firstReceivedTime);
//     setMessages(allMessages);
//   }, [agentTranscriptions, userTranscriptions]);

//   useEffect(() => {
//     if (isVideoOn && videoRef.current) {
//       navigator.mediaDevices.getUserMedia({ video: true, audio: false })
//         .then(stream => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch(err => {
//           console.error('Error accessing camera:', err);
//           setIsVideoOn(false);
//         });
//     } else if (videoRef.current && videoRef.current.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//     }
//   }, [isVideoOn]);

//   const handleSendMessage = () => {
//     if (inputText.trim()) {
//       // Add manual text message to display
//       const newMessage = {
//         id: Date.now(),
//         type: 'user',
//         text: inputText,
//         firstReceivedTime: Date.now()
//       };
//       setMessages(prev => [...prev, newMessage]);
//       setInputText('');
      
//       // Here you would send the text to your agent
//       // Example: sendTextToAgent(inputText);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const toggleVideo = () => {
//     setIsVideoOn(!isVideoOn);
//   };

//   const isConnected = state === 'listening' || state === 'speaking' || state === 'thinking';

//   return (
//     <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
//       {/* Header */}
//       <div className="bg-black bg-opacity-50 backdrop-blur-md border-b border-purple-500/30 px-6 py-3 flex-shrink-0">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//               <Phone className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-white">AI Voice Assistant</h1>
//               <p className="text-sm text-purple-300 capitalize">
//                 {state || 'Ready to connect'}
//               </p>
//             </div>
//           </div>
//           <div className={`px-3 py-1 rounded-full ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'} text-sm font-medium`}>
//             {isConnected ? '● Online' : '○ Offline'}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 w-full overflow-hidden">
//         {/* Video & Visualizer Section */}
//         <div className="lg:w-1/3 flex flex-col gap-4">
//           {/* User Video */}
//           <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-2xl border border-purple-500/30 overflow-hidden relative aspect-video">
//             {isVideoOn ? (
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 playsInline
//                 muted
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-pink-900/50">
//                 <div className="text-center">
//                   <div className="w-20 h-20 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
//                     <VideoOff className="w-10 h-10 text-purple-300" />
//                   </div>
//                   <p className="text-purple-300 text-sm">Camera Off</p>
//                 </div>
//               </div>
//             )}
//             <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded-full text-white text-sm">
//               You
//             </div>
//             <button
//               onClick={toggleVideo}
//               className="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-all duration-200"
//             >
//               {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
//             </button>
//           </div>

//           {/* Audio Visualizer */}
//           <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-2xl border border-purple-500/30 overflow-hidden p-6">
//             <div className="text-center mb-4">
//               <p className="text-blue-300 text-sm font-medium">Voice Activity</p>
//             </div>
//             <div className="h-32 flex items-center justify-center">
//               <BarVisualizer state={state} barCount={7} trackRef={audioTrack} />
//             </div>
//           </div>
//         </div>

//         {/* Chat Section */}
//         <div className="lg:w-2/3 flex flex-col bg-black bg-opacity-50 backdrop-blur-md rounded-2xl border border-purple-500/30 overflow-hidden">
//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-6 space-y-4">
//             {messages.length === 0 ? (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
//                     <Phone className="w-8 h-8 text-purple-400" />
//                   </div>
//                   <p className="text-gray-400 text-sm">Start speaking or type a message...</p>
//                 </div>
//               </div>
//             ) : (
//               messages.map((msg, index) => (
//                 <div
//                   key={msg.id || index}
//                   className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`max-w-[80%] rounded-2xl px-4 py-3 ${
//                       msg.type === 'user'
//                         ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
//                         : 'bg-gray-800/80 text-gray-100 border border-purple-500/20'
//                     }`}
//                   >
//                     <p className="text-sm leading-relaxed">{msg.text}</p>
//                   </div>
//                 </div>
//               ))
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Section */}
//           <div className="border-t border-purple-500/30 p-4 bg-black/30">
//             <div className="flex gap-3 items-end">
//               <div className="flex-1 bg-gray-800/50 rounded-xl border border-purple-500/20 p-3">
//                 <textarea
//                   value={inputText}
//                   onChange={(e) => setInputText(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Type your message..."
//                   className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none text-sm"
//                   rows="2"
//                 />
//               </div>
//               <button
//                 onClick={handleSendMessage}
//                 disabled={!inputText.trim()}
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-xl p-3 transition-all duration-200 disabled:cursor-not-allowed"
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Control Bar */}
//       <div className="bg-black bg-opacity-50 backdrop-blur-md border-t border-purple-500/30 px-6 py-3 flex-shrink-0">
//         <div className="w-full">
//           <VoiceAssistantControlBar />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SimpleVoiceAssistant;

import {
  useVoiceAssistant,
  BarVisualizer,
  VoiceAssistantControlBar,
  useTrackTranscription,
  useLocalParticipant,
  useRoomContext,
} from "@livekit/components-react";
import { Track, DataPacket_Kind } from "livekit-client";
import { useEffect, useState, useRef } from "react";
import { Send, Phone, Video, VideoOff } from 'lucide-react';

const SimpleVoiceAssistant = () => {
  const { state, audioTrack, agentTranscriptions } = useVoiceAssistant();
  const localParticipant = useLocalParticipant();
  const { segments: userTranscriptions } = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  });

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isVideoOn, setIsVideoOn] = useState(false);
  const videoRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const allMessages = [
      ...(agentTranscriptions?.map((t) => ({ ...t, type: "agent" })) ?? []),
      ...(userTranscriptions?.map((t) => ({ ...t, type: "user" })) ?? []),
    ].sort((a, b) => a.firstReceivedTime - b.firstReceivedTime);
    setMessages(allMessages);
  }, [agentTranscriptions, userTranscriptions]);

  useEffect(() => {
    if (isVideoOn && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(err => {
          console.error('Error accessing camera:', err);
          setIsVideoOn(false);
        });
    } else if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }, [isVideoOn]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      // Add manual text message to display
      const newMessage = {
        id: Date.now(),
        type: 'user',
        text: inputText,
        firstReceivedTime: Date.now()
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // Here you would send the text to your agent
      // Example: sendTextToAgent(inputText);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const isConnected = state === 'listening' || state === 'speaking' || state === 'thinking';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-black bg-opacity-50 backdrop-blur-md border-b border-purple-500/30 px-6 py-3 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI Voice Assistant</h1>
              <p className="text-sm text-purple-300 capitalize">
                {state || 'Ready to connect'}
              </p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'} text-sm font-medium`}>
            {isConnected ? '● Online' : '○ Offline'}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 w-full overflow-hidden">
        {/* Video & Visualizer Section */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          {/* User Video */}
          <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-2xl border border-purple-500/30 overflow-hidden relative aspect-video">
            {isVideoOn ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-pink-900/50">
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <VideoOff className="w-10 h-10 text-purple-300" />
                  </div>
                  <p className="text-purple-300 text-sm">Camera Off</p>
                </div>
              </div>
            )}
            <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded-full text-white text-sm">
              You
            </div>
            <button
              onClick={toggleVideo}
              className="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-all duration-200"
            >
              {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </button>
          </div>

          {/* Audio Visualizer */}
          <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-2xl border border-purple-500/30 overflow-hidden p-6">
            <div className="text-center mb-4">
              <p className="text-blue-300 text-sm font-medium">Voice Activity</p>
            </div>
            <div className="h-32 flex items-center justify-center">
              <BarVisualizer state={state} barCount={7} trackRef={audioTrack} />
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="lg:w-2/3 flex flex-col bg-black bg-opacity-50 backdrop-blur-md rounded-2xl border border-purple-500/30 overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-8 h-8 text-purple-400" />
                  </div>
                  <p className="text-gray-400 text-sm">Start speaking or type a message...</p>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={msg.id || index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-gray-800/80 text-gray-100 border border-purple-500/20'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="border-t border-purple-500/30 p-4 bg-black/30">
            <div className="flex gap-3 items-end">
              <div className="flex-1 bg-gray-800/50 rounded-xl border border-purple-500/20 p-3">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none text-sm"
                  rows="2"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-xl p-3 transition-all duration-200 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-black bg-opacity-50 backdrop-blur-md border-t border-purple-500/30 px-6 py-3 flex-shrink-0">
        <div className="w-full">
          <VoiceAssistantControlBar />
        </div>
      </div>
    </div>
  );
};

export default SimpleVoiceAssistant;