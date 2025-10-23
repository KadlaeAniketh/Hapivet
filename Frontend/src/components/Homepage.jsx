// import { useState } from 'react';
// import Leaderboard from './Leaderboard';
// import SelfieZone from './SelfieZone';
// import LiveKitModal from './LiveKitModal';
// import RobotUI from "./RobotUI";
// import F1QuizGame from './F1QuizGame';


// const HomePage = () => {
//   const [activeTab, setActiveTab] = useState('home');
//   const [showChatModal, setShowChatModal] = useState(false);
//   const [showRobotUI, setShowRobotUI] = useState(false);


//   const handleChatClick = () => {
//     setShowChatModal(true);
//   };

//   const handleRobotClick = () => {
//      setShowRobotUI(true);
//    };

//   const renderContent = () => {
//     if (showRobotUI) {  // Add this condition
//       return <RobotUI onBack={() => setShowRobotUI(false)} />;
//     }
//     switch(activeTab) {
//       case 'leaderboard':
//         return <Leaderboard />;
//       case 'selfie':
//         return <SelfieZone />;
//       case 'Gamification':
//         return <F1QuizGame />;

      
//       default:
//         return (
//           <main className="min-h-screen bg-black text-white">
//             {/* F1 Racing Banner */}
//             <div className="w-full bg-red-700 py-2 text-center">
//               <div className="flex justify-center items-center space-x-4">
//                 <div className="h-1 w-16 bg-white"></div>
//                 <h2 className="text-xl font-bold tracking-wider">F1 RACING CHAMPIONSHIP 2025</h2>
//                 <div className="h-1 w-16 bg-white"></div>
//               </div>
//             </div>
            
//             <section className="hero px-8 py-16 text-center">
//               <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
//                 AI LONSO
//               </h1>
//               <p className="text-2xl mb-8 text-red-400">
//                 Experience the Future of Racing AI
//               </p>
              
//               {/* Winner Names Section */}
//               <div className="max-w-4xl mx-auto mb-12">
//                 <h2 className="text-4xl font-bold mb-8 text-red-600">🏆 2025 Championship Winners</h2>
                
//                 {/* Top 2 Drivers with Details */}
//                 <div className="grid md:grid-cols-2 gap-8 mb-8">
//                   {/* First Place */}
//                   <div className="bg-gradient-to-br from-red-800 to-black rounded-xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 border border-red-700">
//                     <div className="text-6xl mb-4">🥇</div>
//                     <h3 className="text-2xl font-bold text-red-500 mb-2">Oscar Piastri</h3>
//                     <div className="text-red-300 space-y-1">
//                       <p className="font-semibold">McLaren</p>
//                       <p>Points: 324</p>
//                       <p>Wins: 7/24 races</p>
//                       <p>Podiums: 14</p>
//                       <p>Fastest Laps: 2</p>
//                     </div>
//                   </div>

//                   {/* Second Place */}
//                   <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 border border-red-700">
//                     <div className="text-6xl mb-4">🥈</div>
//                     <h3 className="text-2xl font-bold text-red-500 mb-2">Lando Norris</h3>
//                     <div className="text-red-300 space-y-1">
//                       <p className="font-semibold">McLaren</p>
//                       <p>Points: 299</p>
//                       <p>Wins: 5/24 races</p>
//                       <p>Podiums: 15</p>
//                       <p>Fastest Laps: 3</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Remaining Winners List */}
//                 <div className="bg-gray-900 rounded-xl p-6 border border-red-800">
//                   <h3 className="text-2xl font-bold mb-4 text-red-600">Championship Standings</h3>
//                   <div className="grid md:grid-cols-2 gap-4 text-lg">
//                     <div className="space-y-2">
//                       <div className="flex justify-between items-center p-2 bg-red-900 bg-opacity-40 rounded border border-red-800">
//                         <span>3. Max Verstappen</span>
//                         <span className="text-red-500">255 pts</span>
//                       </div>
//                       <div className="flex justify-between items-center p-2 bg-red-900 bg-opacity-40 rounded border border-red-800">
//                         <span>4. George Russell</span>
//                         <span className="text-red-500">212 pts</span>
//                       </div>
//                       <div className="flex justify-between items-center p-2 bg-red-900 bg-opacity-40 rounded border border-red-800">
//                         <span>5. Charles Leclerc</span>
//                         <span className="text-red-500">165 pts</span>
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="flex justify-between items-center p-2 bg-red-900 bg-opacity-40 rounded border border-red-800">
//                         <span>6. Lewis Hamilton</span>
//                         <span className="text-red-500">121 pts</span>
//                       </div>
//                       <div className="flex justify-between items-center p-2 bg-red-900 bg-opacity-40 rounded border border-red-800">
//                         <span>7. Kimi Antonelli</span>
//                         <span className="text-red-500">78 pts</span>
//                       </div>
//                       <div className="flex justify-between items-center p-2 bg-red-900 bg-opacity-40 rounded border border-red-800">
//                         <span>8. Alexander Albon</span>
//                         <span className="text-red-500">70 pts</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Chat Button */}
//               <button 
//                 onClick={handleChatClick}
//                 className="bg-gradient-to-r from-red-700 to-red-900 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:from-red-600 hover:to-red-800 transform hover:scale-105 transition-all duration-300 border border-red-600"
//               >
//                 💬 Talk to AI Lonso
//               </button>

//               <button 
//                 onClick={handleRobotClick}
//                 className="bg-gradient-to-r from-red-700 to-red-900 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:from-red-600 hover:to-red-800 transform hover:scale-105 transition-all duration-300 border border-red-600"
//               >
//                 ChatBot to AI Lonso
//               </button>

//             </section>
//           </main>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black">
//       {/* Header with Navigation */}
//       <header className="bg-black shadow-lg sticky top-0 z-50 border-b border-red-800">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex justify-between items-center py-4">
//             {/* Logo */}
//             <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
//               AI LONSO
//             </div>

//             {/* Navigation Tabs */}
//             <nav className="flex space-x-8">
//               <button
//                 onClick={() => setActiveTab('home')}
//                 className={`px-4 py-2 rounded-lg transition-all duration-300 ${
//                   activeTab === 'home' 
//                     ? 'bg-red-700 text-white' 
//                     : 'text-gray-400 hover:text-white hover:bg-gray-900'
//                 }`}
//               >
//                 Home
//               </button>

//               <button
//                 onClick={() => setActiveTab('leaderboard')}
//                 className={`px-4 py-2 rounded-lg transition-all duration-300 ${
//                   activeTab === 'leaderboard' 
//                     ? 'bg-red-700 text-white' 
//                     : 'text-gray-400 hover:text-white hover:bg-gray-900'
//                 }`}
//               >
//                 Leaderboard
//               </button>
              
//               <button
//                 onClick={() => setActiveTab('selfie')}
//                 className={`px-4 py-2 rounded-lg transition-all duration-300 ${
//                   activeTab === 'selfie' 
//                     ? 'bg-red-700 text-white' 
//                     : 'text-gray-400 hover:text-white hover:bg-gray-900'
//                 }`}
//               >
//                 Selfie Zone
//               </button>

//               <button
//                 onClick={() => setActiveTab('Gamification')}
//                 className={`px-4 py-2 rounded-lg transition-all duration-300 ${
//                   activeTab === 'Gamification' 
//                     ? 'bg-red-700 text-white' 
//                     : 'text-gray-400 hover:text-white hover:bg-gray-900'
//                 }`}
//               >
//                 Gamification
//               </button>
//             </nav>

//             {/* Corner Button */}
//             <button 
//               onClick={handleChatClick}
//               className="bg-gradient-to-r from-red-700 to-red-900 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:from-red-600 hover:to-red-800 transform hover:scale-105 transition-all duration-300 border border-red-600"
//             >
//               🏎️ Talk to AI Lonso
//             </button>
//           </div>
//         </div>
        
//       </header>

//       {/* Content */}
//       {renderContent()}

//       {/* Chat Modal */}
//       {showChatModal && <LiveKitModal setShowSupport={setShowChatModal} />}
      
//       {/* Custom styles for the modal */}
//       <style jsx>{`
//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: rgba(0, 0, 0, 0.8);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//         }
        
//         .modal-content {
//           background: linear-gradient(to bottom, #1a1a1a, #000);
//           border: 2px solid #dc2626;
//           border-radius: 12px;
//           width: 90%;
//           max-width: 500px;
//           padding: 2rem;
//           color: white;
//           box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
//         }
        
//         .name-form {
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//         }
        
//         .name-form h2 {
//           color: #dc2626;
//           margin-bottom: 1rem;
//           text-align: center;
//         }
        
//         .name-form input {
//           padding: 0.75rem;
//           border-radius: 6px;
//           border: 1px solid #dc2626;
//           background-color: #1a1a1a;
//           color: white;
//         }
        
//         .name-form button {
//           padding: 0.75rem;
//           border-radius: 6px;
//           border: none;
//           background-color: #dc2626;
//           color: white;
//           font-weight: bold;
//           cursor: pointer;
//           transition: background-color 0.3s;
//         }
        
//         .name-form button:hover {
//           background-color: #b91c1c;
//         }
        
//         .cancel-button {
//           background-color: #4b5563 !important;
//         }
        
//         .cancel-button:hover {
//           background-color: #374151 !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HomePage;

import { useState, useEffect } from "react";
import LiveKitModal from "./LiveKitModal";
import { MessageCircle, Mic, Users, X } from "lucide-react";

// Import the other pages (adjust paths if needed)
import Schedule from "./Schedule";
import Inventory from "./Inventory";
import Patients from "./Patients";

const HapiVetHomePage = () => {
  const [activePage, setActivePage] = useState("home"); // "home" | "schedule" | "inventory" | "patients"
  const [showChatModal, setShowChatModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [liveUsers, setLiveUsers] = useState(247);

  // Simulate live user updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Switch to render the selected page
  const renderPage = () => {
    switch (activePage) {
      case "schedule":
        return <Schedule />;
      case "inventory":
        return <Inventory />;
      case "patients":
        return <Patients />;
      case "home":
      default:
        return (
          <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 bg-gradient-to-b from-white to-green-50">
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 text-green-700 font-semibold mb-3">
                <Users className="w-5 h-5" />
                <span>{liveUsers} veterinarians online</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                AI-Powered Veterinary Assistance
              </h2>
              <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
                Get instant support from our AI veterinarian through voice or chat — anytime, anywhere.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <button
                onClick={() => setShowVoiceModal(true)}
                className="w-full sm:w-56 bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-md"
              >
                <Mic className="w-6 h-6" />
                Talk to AI
              </button>

              <button
                onClick={() => setShowChatModal(true)}
                className="w-full sm:w-56 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-md"
              >
                <MessageCircle className="w-6 h-6" />
                Chat with AI
              </button>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Header / Nav */}
      <header className="shadow-md sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-700">🐾 HapiVet AI</h1>

          <nav className="flex gap-6 items-center">
            <button
              onClick={() => setActivePage("home")}
              className={`font-semibold ${activePage === "home" ? "text-green-700 underline" : "text-gray-600 hover:text-green-700"}`}
            >
              Home
            </button>

            <button
              onClick={() => setActivePage("schedule")}
              className={`font-semibold ${activePage === "schedule" ? "text-green-700 underline" : "text-gray-600 hover:text-green-700"}`}
            >
              Schedule
            </button>

            <button
              onClick={() => setActivePage("inventory")}
              className={`font-semibold ${activePage === "inventory" ? "text-green-700 underline" : "text-gray-600 hover:text-green-700"}`}
            >
              Inventory
            </button>

            <button
              onClick={() => setActivePage("patients")}
              className={`font-semibold ${activePage === "patients" ? "text-green-700 underline" : "text-gray-600 hover:text-green-700"}`}
            >
              Patients
            </button>

            {/* quick actions (kept in header) */}
            <div className="hidden sm:flex items-center gap-3 ml-4">
              <button
                onClick={() => setShowVoiceModal(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition"
              >
                <Mic className="w-4 h-4" />
                Talk
              </button>
              <button
                onClick={() => setShowChatModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition"
              >
                <MessageCircle className="w-4 h-4" />
                Chat
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Active page content */}
      <main className="flex-1">{renderPage()}</main>

      {/* Footer */}
      <footer className="mt-auto bg-gray-100 border-t border-gray-300 py-6 text-center text-gray-600 text-sm">
        © 2025 HapiVet AI — All Rights Reserved | HIPAA & ISO Certified
      </footer>

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md p-6 relative">
            <button
              onClick={() => setShowChatModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold mb-4 text-green-700">Chat with HapiVet AI</h3>
            <div className="h-64 bg-gray-100 border border-gray-200 rounded-lg p-3 overflow-y-auto mb-4">
              <div className="bg-green-50 p-3 rounded-lg text-sm mb-2 text-gray-700">
                👋 Hi! I’m HapiVet AI. How can I help your pet today?
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition">
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voice (LiveKit) Modal */}
      {showVoiceModal && <LiveKitModal setShowSupport={setShowVoiceModal} />}
    </div>
  );
};

export default HapiVetHomePage;
