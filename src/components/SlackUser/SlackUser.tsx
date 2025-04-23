import React from "react";
import emojiMap from "../../data/emojiMap.json";
import customEmojis from "../../data/customEmojis.json";

interface SlackUserInfo {
  id: string;
  real_name: string;
  image: string;
  presence: string;
  status_text?: string;
  status_emoji?: string;
  huddle_state?: string;
}

interface Props {
  user: SlackUserInfo;
}

const SlackUser: React.FC<Props> = ({ user }) => {
  // ** Create a function for returning unicode or custom emoji **
  const emojiKey = user.status_emoji?.replace(/:/g, "") || "";

  // Check for standard emoji or fallback to custom
  const unicodeEmoji = (emojiMap as Record<string, string>)[emojiKey];
  const customEmojiUrl = (customEmojis as Record<string, string>)[emojiKey];

  const renderEmoji = () => {
    if (unicodeEmoji) {
      return <span className="status-emoji">{unicodeEmoji}</span>;
    }
    if (customEmojiUrl) {
      return (
        <img
          src={customEmojiUrl}
          alt={emojiKey}
          className="status-custom-emoji"
        />
      );
    }
    // Default fallback emoji
    return <span className="status-emoji">💬</span>;
  };

  // ** Reference renderEmoji() like this instead in the TSX markup **
  // ** <RenderEmoji /> **

  // ** Create funtions to reference in the TSX markup **
  // ** <SlackUserPresence /> **
  // ** <SlackUserInfo />
  return (
    <div
      className={`slack-user ${
        user.presence === "active" ? "active" : "inactive"
      }`}
    >
      <img src={user.image} alt={user.real_name} />
      <div className="user-info">
        <p>{user.real_name}</p>

        {user.status_emoji && user.status_text && (
          <p className="status">
            {renderEmoji()} {user.status_text}
          </p>
        )}

        {user.huddle_state === "In a huddle" && (
          <p className="status">
            <span className="status-emoji">🎧</span> In a huddle
          </p>
        )}
      </div>
    </div>
  );
};

export default SlackUser;
