import { Fixture, Prediction, Team } from "../../../../shared/types/database";

export const usePredictions = (
  fixtures: Fixture[],
  predictions: Prediction[],
  teams: Team[]
) => {
  let roundPredictions: Record<
    string,
    {
      fixture: Fixture;
      prediction: Prediction;
      homeTeam: Team;
      awayTeam: Team;
    }[]
  > = {};

  fixtures.forEach((fixture) => {
    const prediction = predictions.find(
      (prediction) => prediction.fixtureId === fixture.id
    );

    const homeTeam = teams.find((team) => fixture.homeTeamId === team.id);
    const awayTeam = teams.find((team) => fixture.awayTeamId === team.id);

    if (!prediction || !homeTeam || !awayTeam) return;

    if (!roundPredictions[fixture.roundNumber]) {
      roundPredictions[fixture.roundNumber] = [
        { fixture, prediction, homeTeam, awayTeam },
      ];
      return;
    }

    roundPredictions[fixture.roundNumber].push({
      fixture,
      prediction,
      homeTeam,
      awayTeam,
    });
  });

  return roundPredictions;
};
