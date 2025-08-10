import { createLazyFileRoute } from "@tanstack/react-router";
import Banner from "../components/Banner";
import Box from "../components/Box";

const Rules = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Banner>
        <h1 className="text-2xl font-bold text-white">Rules</h1>
      </Banner>

      <div className="max-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 p-3">
        <Box className="flex flex-col gap-2 text-center text-sm">
          <h2 className="text-2xl font-bold">Welcome to FootyBee</h2>
          <p>
            Welcome to FootyBee, a Premier League football predictor where you
            can make predictions on games and create and join leagues with your
            friends.
          </p>
          <p>
            Predict results every gameweek in the league. Below is a summary for
            how you gain points:
          </p>
        </Box>

        <div className="flex flex-col gap-4 md:flex-row">
          <Box className="flex flex-col items-center gap-2 text-center text-sm">
            <h2 className="text-2xl font-bold">Premier League Rules</h2>
            <p>
              During the Premier League season, you can earn points based on the
              accuracy of your match predictions. The scoring system works as
              follows:
            </p>
            <ul className="flex flex-col gap-1 pl-3">
              <li>
                <b>Correct Result - 15 Points</b>
                <p>
                  If you predict the exact final score (e.g., 2-1), you'll earn
                  15 points.
                </p>
              </li>
              <li>
                <b>Correct Outcome - 5 Points</b>
                <p>
                  If you predict the correct outcome (i.e Sunderland to win
                  against Newcastle), you'll earn 5 points.
                </p>
              </li>
              <li>
                <b>Incorrect Prediction - 0 Points</b>
                <p>
                  If you predict the incorrect outcome, you'll earn 0 points.
                </p>
              </li>
            </ul>

            <p className="my-2 text-lg font-bold">Here are some examples</p>

            <ul className="flex flex-col gap-1 pl-3">
              <li>
                <b>You predict 2-1, the match ends 2-1:</b> <br />
                15 points (Correct Result)
              </li>
              <li>
                <b>You predict 1-0, the match ends 2-1:</b> <br />5 points
                (Correct Outcome)
              </li>
              <li>
                <b>You predict 1-1, the match ends 0-0:</b> <br />5 points
                (Correct Outcome)
              </li>
              <li>
                <b>You predict 2-0, the match ends 2-1:</b> <br />5 points
                (Correct Outcome)
              </li>
              <li>
                <b>You predict 1-1, the match ends 2-1:</b> <br /> 0 points
                (Incorrect Prediction)
              </li>
            </ul>
          </Box>
        </div>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/rules")({
  component: Rules,
});
