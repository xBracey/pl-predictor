import { useMemo } from "react";
import {
  User,
  Team,
  Fixture,
  Prediction,
} from "../../../../shared/types/database";
import Banner from "../../components/Banner";
import FixturePoints from "../../components/FixturePoints";
import LogoutButton from "../../components/LogoutButton";
// import BonusPoints from "../../components/BonusPoints";

interface ProfilePageProps {
  user: User;
  teams: Team[];
  fixtures: Fixture[];
  predictions: Prediction[];
  isCurrentUser: boolean;
}

export const ProfilePage = ({
  user,
  teams,
  fixtures,
  predictions,
  isCurrentUser,
}: ProfilePageProps) => {
  const totalPoints = useMemo(() => {
    const points = predictions.reduce((acc, prediction) => {
      return acc + prediction.points;
    }, 0);

    return points;
  }, [predictions]);

  return (
    <div>
      <Banner>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <h2 className="text-2xl font-bold text-white">{`${user.username}'s Profile`}</h2>
          {isCurrentUser && <LogoutButton />}
        </div>
      </Banner>
      <div className="my-4 flex flex-col items-center">
        <p className="my-4 text-xl font-bold text-white">{`Total points: ${totalPoints}`}</p>
      </div>

      <FixturePoints
        fixtures={fixtures}
        teams={teams}
        predictions={predictions}
      />
    </div>
  );
};
