// import { useState, useCallback } from "react";
// import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
// import "@livekit/components-styles";
// import SimpleVoiceAssistant from "./SimpleVoiceAssistant";

// const LiveKitModal = ({ setShowSupport }) => {
//   const [isSubmittingName, setIsSubmittingName] = useState(true);
//   const [name, setName] = useState("");
//   const [token, setToken] = useState(null);

//   const getToken = useCallback(async (userName) => {
//     try {
//       const response = await fetch(
//         `/api/getToken?name=${encodeURIComponent(userName)}`
//       );
//       const token = await response.text();
//       setToken(token);
//       console.log(token);
//       setIsSubmittingName(false);
//     } catch (error) {
//       console.error("Failed to get token:", error);
//     }
//   }, []);

//   const handleNameSubmit = (e) => {
//     e.preventDefault();
//     if (name.trim()) {
//       getToken(name);
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <div className="support-room">
//           {isSubmittingName ? (
//             <form onSubmit={handleNameSubmit} className="name-form">
//               <h2>Enter your name to connect with AI Avatar</h2>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Your name"
//                 required
//               />
//               <button type="submit">Connect</button>
//               <button
//                 type="button"
//                 className="cancel-button"
//                 onClick={() => setShowSupport(false)}
//               >
//                 Cancel
//               </button>
//             </form>
//           ) : token ? (
//             <LiveKitRoom
//               serverUrl={import.meta.env.VITE_LIVEKIT_URL}
//               token={token}
//               connect={true}
//               video={true} // No camera for AI avatar
//               audio={true}  // Receive/send audio
//               onDisconnected={() => {
//                 setShowSupport(false);
//                 setIsSubmittingName(true);
//               }}
//             >
//               <RoomAudioRenderer />
//               <SimpleVoiceAssistant />
//             </LiveKitRoom>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveKitModal;

import { useState, useCallback } from "react";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import SimpleVoiceAssistant from "./SimpleVoiceAssistant";

const LiveKitModal = ({ setShowSupport }) => {
  const [isSubmittingName, setIsSubmittingName] = useState(true);
  const [name, setName] = useState("");
  const [token, setToken] = useState(null);

  const getToken = useCallback(async (userName) => {
    try {
      const response = await fetch(
        `/api/getToken?name=${encodeURIComponent(userName)}`
      );
      const token = await response.text();
      setToken(token);
      console.log(token);
      setIsSubmittingName(false);
    } catch (error) {
      console.error("Failed to get token:", error);
    }
  }, []);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      getToken(name);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="support-room">
          {isSubmittingName ? (
            <form onSubmit={handleNameSubmit} className="name-form">
              <h2>Enter your name to connect with AI Avatar</h2>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
              <button type="submit">Connect</button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowSupport(false)}
              >
                Cancel
              </button>
            </form>
          ) : token ? (
            <LiveKitRoom
              serverUrl={import.meta.env.VITE_LIVEKIT_URL}
              token={token}
              connect={true}
              video={true}
              audio={true}
              onDisconnected={() => {
                setShowSupport(false);
                setIsSubmittingName(true);
              }}
            >
              <RoomAudioRenderer />
              <SimpleVoiceAssistant />
            </LiveKitRoom>
          ) : null}
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: linear-gradient(to bottom, #000000ff, #000);
          border: 2px solid #f4f4f4ff;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          padding: 2rem;
          color: white;
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
        }

        .name-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .name-form h2 {
          color: #dc2626;
          margin-bottom: 1rem;
          text-align: center;
        }

        .name-form input {
          padding: 0.75rem;
          border-radius: 6px;
          border: 1px solid #dc2626;
          background-color: #000000ff;
          color: white;
        }

        .name-form button {
          padding: 0.75rem;
          border-radius: 6px;
          border: none;
          background-color: #dc2626;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .name-form button:hover {
          background-color: #b91c1c;
        }

        .cancel-button {
          background-color: #4b5563 !important;
        }

        .cancel-button:hover {
          background-color: #374151 !important;
        }
      `}</style>
    </div>
  );
};

export default LiveKitModal;

