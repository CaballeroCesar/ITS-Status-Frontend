import React from "react";

interface SlackUserInfo {
  id: string;
  real_name: string;
  image: string;
  presence: string;
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
      </div>
    </div>
  );
};

export default SlackUser;
