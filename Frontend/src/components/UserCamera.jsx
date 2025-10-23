import { useLocalParticipant, ParticipantTile } from "@livekit/components-react";

const UserCamera = () => {
  const localParticipant = useLocalParticipant(); // Must be inside <LiveKitRoom>

  // RETURN NULL if not ready
  if (!localParticipant || !localParticipant.localParticipant) return null;

  return (
    <ParticipantTile
      participant={localParticipant.localParticipant}
      isLocal={true}
      className="w-full h-full object-cover rounded-lg"
    />
  );
};

export default UserCamera;
