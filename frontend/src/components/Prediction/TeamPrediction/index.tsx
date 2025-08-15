interface IPredictionButton {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const transformName = (name: string) => name.replace(/\s/g, "_");

const PredictionButton = ({
  onClick,
  children,
  disabled,
}: IPredictionButton) => (
  <button
    className="bg-picton-400 hover:bg-picton-500 disabled:bg-picton-400 rounded px-2 py-1 text-gray-800 transition-all disabled:cursor-not-allowed disabled:opacity-40"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

interface ITeamPrediction {
  teamName: string;
  score: number;
  incrementScore: () => void;
  decrementScore: () => void;
  inverted?: boolean;
}

const TeamPrediction = ({
  teamName,
  score,
  incrementScore,
  decrementScore,
  inverted = false,
}: ITeamPrediction) => (
  <div className="text-shamrock-950 flex flex-1 flex-col items-center">
    <div
      className={`flex items-center justify-center gap-2 p-2 ${
        inverted ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <span className="text-base font-bold">{teamName}</span>
      <img
        src={`/logos/${transformName(teamName)}.png`}
        alt={teamName}
        className="h-8 w-8 object-contain"
      />
    </div>
    <div className="flex w-full items-center justify-around px-1">
      <PredictionButton onClick={decrementScore} disabled={score === 0}>
        -
      </PredictionButton>
      <span className="flex w-4 justify-center text-xl font-bold">{score}</span>
      <PredictionButton onClick={incrementScore}>+</PredictionButton>
    </div>
  </div>
);

export default TeamPrediction;
