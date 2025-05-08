import React from "react";
import emojiMap from "../../data/emojiMap.json";
import customEmojis from "../../data/customEmojis.json";

interface Props {
  statusEmoji?: string;
}

const RenderEmoji: React.FC<Props> = ({ statusEmoji }) => {
  const emojiKey = statusEmoji?.replace(/:/g, "") || "";
  const unicode = (emojiMap as Record<string, string>)[emojiKey];
  const url = (customEmojis as Record<string, string>)[emojiKey];

  if (unicode) {
    return <span className="status-emoji">{unicode}</span>;
  }
  if (url) {
    return <img src={url} alt={emojiKey} className="status-custom-emoji" />;
  }
  return <span className="status-emoji">💬</span>;
};

export default RenderEmoji;