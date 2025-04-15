import React, { useEffect } from "react";
import { useAppDispatch } from "../../store/utilities/useAppDispatch"; // Use typed dispatch
import { fetchSlackUsers } from "../../components/SlackUser/slackUserActionCreators"; // Fetch action creator
import { useAppStateSelector } from "../../store/utilities/useAppStateSelector"; // For state selector
import SlackUser from "../../components/SlackUser/SlackUser"; // SlackUser component
import "../../styles/styles.scss"; // Import styles

const SlackStatus: React.FC = () => {
  const dispatch = useAppDispatch(); 
  const { users, loading, error } = useAppStateSelector((state) => state.slackUser); // Get state from redux

  useEffect(() => {
    dispatch(fetchSlackUsers()); // Dispatch fetchSlackUsers action to fetch data on mount
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!users.length) return <div>No user data found.</div>;

  const half = Math.ceil(users.length / 2);
  const leftUsers = users.slice(0, half);
  const rightUsers = users.slice(half);

  return (
    <div className="slack-container">
      <div className="split-columns">
        <div className="column">
          {leftUsers.map((user) => (
            <SlackUser key={user.id} user={user} /> 
          ))}
        </div>
        <div className="column">
          {rightUsers.map((user) => (
            <SlackUser key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlackStatus;
