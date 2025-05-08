import React from "react";
import SlackUserPresence from "../SlackUser/SlackUserPresence"

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
  return (
    <div className={`slack-user ${user.presence === "active" ? "active" : "inactive"}`}>
      <img src={user.image} alt={user.real_name} />
      <div className="user-info">
        <p>{user.real_name}</p>
        <SlackUserPresence
          status_emoji={user.status_emoji}
          status_text={user.status_text}
          huddle_state={user.huddle_state}
        />
      </div>
    </div>
  );
};

export default SlackUser;
