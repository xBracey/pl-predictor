import dayjs from "dayjs";

const transformName = (name: string) => name.replace(/\s/g, "_");

interface IFixture {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  dateTime: number;
  hasDate?: boolean;
  isProfilePage?: boolean;
}

const Fixture = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  dateTime,
  hasDate = true,
  isProfilePage,
}: IFixture) => {
  return (
    <div className="flex flex-col items-center justify-between text-sm font-bold text-white">
      <div className="flex items-center gap-1.5">
        <img
          src={`/logos/${transformName(homeTeam)}.png`}
          alt={homeTeam}
          className="h-10 w-10"
        />
        <p>{isProfilePage ? homeTeam.slice(0, 3).toUpperCase() : homeTeam}</p>
        {homeScore !== undefined && awayScore !== undefined ? (
          <div className={`flex flex-col items-center justify-center`}>
            <div className="flex items-center justify-center">
              <p>{homeScore}</p>
              <p>-</p>
              <p>{awayScore}</p>
            </div>
          </div>
        ) : (
          <p>vs</p>
        )}
        <p>{isProfilePage ? awayTeam.slice(0, 3).toUpperCase() : awayTeam}</p>
        <img
          src={`/logos/${transformName(awayTeam)}.png`}
          alt={awayTeam}
          className="h-10 w-10"
        />
      </div>
      {hasDate && (
        <p className="text-sm text-gray-200">
          {dayjs.unix(dateTime / 1000).format("Do MMM HH:mm")}
        </p>
      )}
    </div>
  );
};

export default Fixture;
