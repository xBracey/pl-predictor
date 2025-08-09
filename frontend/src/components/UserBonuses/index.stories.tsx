import { Story } from "@ladle/react";
import UserBonuses from ".";

export const UserBonusesStory: Story = () => (
  <UserBonuses
    isPredictionLocked={false}
    onEditBonusTeam={() => {}}
    teams={[]}
  />
);

UserBonusesStory.storyName = "UserBonuses";
