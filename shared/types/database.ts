export interface Fixture {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  dateTime: number;
  homeTeamScore: number;
  awayTeamScore: number;
  roundNumber: number;
}
export interface Prediction {
  username: string;
  fixtureId: number;
  homeTeamScore: number;
  awayTeamScore: number;
  points?: number;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}
export interface User {
  username: string;
  admin: boolean;
  bonusTeamId: number | null;
}
