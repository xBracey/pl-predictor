import { Link } from "@tanstack/react-router";
import React from "react";
import { LeaderboardEntry } from "../../queries/useGetLeaderboard";

interface ILeaderboard {
  leaderboard: LeaderboardEntry[];
  currentUsername?: string;
  isPreview?: boolean;
}

const Leaderboard = ({
  leaderboard,
  currentUsername,
  isPreview,
}: ILeaderboard) => {
  const UserComponentWrap = isPreview ? React.Fragment : Link;

  return (
    <div className="flex flex-col overflow-hidden rounded-md text-center text-sm">
      <div className="bg-shamrock-400 flex flex-1 py-3 px-4 font-bold uppercase leading-normal">
        <h3 className="w-16 md:w-20">
          <span className="hidden sm:inline">Position</span>
          <span className="sm:hidden">Pos</span>
        </h3>
        <h3 className="flex-1">Name</h3>
        <h3 className="w-16 md:w-20">
          <span className="hidden sm:inline">Points</span>
          <span className="sm:hidden">Pts</span>
        </h3>
      </div>
      {leaderboard.map((user, index) => (
        <UserComponentWrap to={`/profile/${user.username}`}>
          <div
            key={user.username}
            className={`${
              currentUsername === user.username
                ? "bg-picton-500"
                : index % 2 === 0
                ? "bg-shamrock-200"
                : "bg-shamrock-100"
            } ${
              currentUsername === user.username ? "text-white" : "text-gray-600"
            } ${
              !isPreview
                ? currentUsername === user.username
                  ? "hover:bg-picton-600"
                  : index % 2 === 0
                  ? "hover:bg-shamrock-300"
                  : "hover:bg-shamrock-200"
                : ""
            }  flex flex-1 py-3 px-4 transition-all`}
          >
            <p className="w-16 md:w-20">{index + 1}</p>
            <p className="flex-1">{user.username}</p>
            <p className="w-16 md:w-20">{user.totalPoints}</p>
          </div>
        </UserComponentWrap>
      ))}
    </div>
  );
};

export default Leaderboard;
