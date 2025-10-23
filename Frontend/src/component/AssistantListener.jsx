import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AssistantListener() {
  const navigate = useNavigate();

  useEffect(() => {
    // Example: replace with LiveKit WebSocket later
    const socket = new WebSocket("ws://localhost:8765");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.command === "navigate") {
        if (data.page === "home") navigate("/");
        if (data.page === "schedule") navigate("/schedule");
        if (data.page === "inventory") navigate("/inventory");
        if (data.page === "patients") navigate("/patients");
      }
    };

    return () => socket.close();
  }, [navigate]);

  return null;
}
