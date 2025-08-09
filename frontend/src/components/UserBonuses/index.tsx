import { Select } from "@mantine/core";
import { Team } from "../../../../shared/types/database";
import { usePredictionStore } from "../../zustand/predictions";
import PredictionLock from "../PredictionLock";

interface IUserBonuses {
  onEditBonusTeam: (teamId: number) => void;
  teams: Team[];
  isPredictionLocked: boolean;
}

const UserBonuses = ({
  onEditBonusTeam,
  teams,
  isPredictionLocked,
}: IUserBonuses) => {
  const { state } = usePredictionStore();

  return (
    <div className="relative">
      <div
        className={`flex flex-col gap-4 py-6 text-white ${
          isPredictionLocked ? "pointer-events-none opacity-70" : ""
        }`}
      >
        <h2 className="text-center text-2xl font-bold">Bonus Predictions</h2>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Select
            label="Bonus Team (10 points per win)"
            placeholder="Select bonus team"
            data={teams.map((team) => ({
              value: team.id.toString(),
              label: team.name,
            }))}
            searchable
            value={state.bonuses.teamId ? state.bonuses.teamId.toString() : ""}
            onChange={(value) => onEditBonusTeam(parseInt(value, 10))}
          />
        </div>
      </div>

      <PredictionLock isLocked />
    </div>
  );
};

export default UserBonuses;
