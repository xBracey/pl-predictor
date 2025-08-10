import { useEffect, useMemo, MouseEvent, useState } from "react";
import { useGetFixture } from "../../../queries/useGetFixture";
import AdminAddEdit from "../AdminAddEdit";
import { useGetTeams } from "../../../queries/useGetTeams";
import { useForm } from "@mantine/form";
import { usePostFixture } from "../../../queries/usePostFixture";
import { Button, LoadingOverlay, NumberInput, Select } from "@mantine/core";
import { Fixture } from "../../../../../shared/types/database";
import { DateTimePicker } from "@mantine/dates";
import { useNavigate } from "@tanstack/react-router";

interface IFixtureAdmin {
  id?: number;
}

const FixtureAdmin = ({ id }: IFixtureAdmin) => {
  const { data: fixture, isLoading } = useGetFixture(id);
  const { data: teams, isLoading: isLoadingTeams } = useGetTeams();
  const { postFixture, isLoading: isLoadingFixture } = usePostFixture(id);
  const [hasReset, setHasReset] = useState(false);
  const navigate = useNavigate();

  const form = useForm<Omit<Fixture, "id">>({
    mode: "controlled",
    initialValues: {
      roundNumber: undefined,
      homeTeamId: undefined,
      awayTeamId: undefined,
      dateTime: undefined,
      homeTeamScore: undefined,
      awayTeamScore: undefined,
    },
    validate: (values) => ({
      roundNumber: values.roundNumber ? undefined : "Round Number is required",
      homeTeamId: values.homeTeamId ? undefined : "Home team is required",
      awayTeamId: values.awayTeamId ? undefined : "Away team is required",
      dateTime: values.dateTime ? undefined : "Date is required",
    }),
  });

  const onSubmitAdd = (event: MouseEvent) => {
    event.preventDefault();
    console.log("tetgas");

    const roundNumber = form.values.roundNumber;
    const dateTime = form.values.dateTime;

    postFixture(form.values);
    form.reset();
    setHasReset(true);

    setTimeout(() => {
      setHasReset(false);
      form.setFieldValue("roundNumber", roundNumber);
      form.setFieldValue("dateTime", dateTime);
    }, 50);
  };

  useEffect(() => {
    if (fixture) {
      form.setValues({
        roundNumber: fixture.roundNumber,
        homeTeamId: fixture.homeTeamId,
        awayTeamId: fixture.awayTeamId,
        dateTime: fixture.dateTime,
        homeTeamScore: fixture.homeTeamScore,
        awayTeamScore: fixture.awayTeamScore,
      });
    }
  }, [fixture]);

  const teamsOptions = useMemo(() => {
    if (!teams) return [];

    return teams.map((team) => ({
      label: team.name,
      value: team.id.toString(),
    }));
  }, [teams]);

  if (hasReset) return null;

  return (
    <AdminAddEdit
      id={id}
      isLoading={isLoading}
      entityIsDefined={!!fixture}
      title="Fixture"
    >
      <LoadingOverlay visible={isLoadingFixture || isLoadingTeams} />
      <form
        onSubmit={form.onSubmit((values) => {
          postFixture(values);
          navigate({ to: "/admin" });
        })}
        className="flex flex-col gap-4"
      >
        <NumberInput
          id="roundNumber"
          label="Round Number"
          required
          {...form.getInputProps("roundNumber")}
        />

        <Select
          id="homeTeamId"
          label="Home Team"
          required
          data={teamsOptions}
          {...form.getInputProps("homeTeamId")}
          value={form.values.homeTeamId?.toString()}
          searchable
        />

        <Select
          id="awayTeamId"
          label="Away Team"
          required
          data={teamsOptions}
          {...form.getInputProps("awayTeamId")}
          value={form.values.awayTeamId?.toString()}
          searchable
        />

        <DateTimePicker
          id="dateTime"
          label="Date"
          required
          {...form.getInputProps("dateTime")}
          value={new Date(form.values.dateTime ?? Date.now())}
          onChange={(value) =>
            form.setValues({ ...form.values, dateTime: value?.getTime() })
          }
        />

        <NumberInput
          id="homeTeamScore"
          label="Home Team Score"
          {...form.getInputProps("homeTeamScore")}
        />

        <NumberInput
          id="awayTeamScore"
          label="Away Team Score"
          {...form.getInputProps("awayTeamScore")}
        />

        <div className="flex items-center justify-around">
          <Button type="submit" color="green">
            Submit
          </Button>
          <Button type="button" onClick={onSubmitAdd} color="blue">
            Submit & Add Another
          </Button>
        </div>
      </form>
    </AdminAddEdit>
  );
};

export default FixtureAdmin;
