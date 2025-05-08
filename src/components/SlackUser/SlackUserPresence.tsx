import React from "react";
import RenderEmoji from "../RenderEmoji/RenderEmoji";

interface SlackUserPresenceProps {
  status_emoji?: string;
  status_text?: string;
  huddle_state?: string;
}

const SlackUserPresence: React.FC<SlackUserPresenceProps> = ({
  status_emoji,
  status_text,
  huddle_state,
}) => {
  return (
    <>
      {status_emoji && status_text && (
        <p className="status">
          <RenderEmoji statusEmoji={status_emoji} /> {status_text}
        </p>
      )}

      {huddle_state === "In a huddle" && (
        <p className="status">
          <span className="status-emoji">🎧</span> In a huddle
        </p>
      )}
    </>
  );
};

export default SlackUserPresence;
