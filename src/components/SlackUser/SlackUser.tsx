import React from 'react';

export interface SlackUserInfo {
  id: string;
  real_name: string;
  image: string;
  presence: string;
}

interface SlackUserProps {
  user: SlackUserInfo; // Here we define that the `user` prop must be of type `SlackUserInfo`
}

const SlackUser: React.FC<SlackUserProps> = ({ user }) => {
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
