import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/styles.scss";

interface SlackUserInfo {
  id: string;
  real_name: string;
  image: string;
  presence: string;
}

const SlackStatus: React.FC = () => {
  const [users, setUsers] = useState<SlackUserInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlackUsers = async () => {
      try {
        const response = await axios.get("https://vwzbvkln-3000.use.devtunnels.ms/status/slack/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlackUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!users.length) return <div>No user data found.</div>;

  const half = Math.ceil(users.length / 2);
  const leftUsers = users.slice(0, half);
  const rightUsers = users.slice(half);

  return (
    <div className="slack-container">
      <div className="split-columns">
        <div className="column">
          {leftUsers.map((user) => (
            <div
              key={user.id}
              className={`slack-user ${user.presence === "active" ? "active" : "inactive"}`}
            >
              <img src={user.image} alt={user.real_name} />
              <div className="user-info">
                <p>{user.real_name}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="column">
          {rightUsers.map((user) => (
            <div
              key={user.id}
              className={`slack-user ${user.presence === "active" ? "active" : "inactive"}`}
            >
              <img src={user.image} alt={user.real_name} />
              <div className="user-info">
                <p>{user.real_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );  
};

export default SlackStatus;
