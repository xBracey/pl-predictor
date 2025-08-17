import { useNavigate } from "@tanstack/react-router";
import { useGetTeam } from "../../../queries/useGetTeam";
import AdminAddEdit from "../AdminAddEdit";
import { useForm } from "@mantine/form";
import { Team } from "../../../../../shared/types/database";
import { useEffect } from "react";
import { usePostTeam } from "../../../queries/usePostTeam";
import { Button, LoadingOverlay, Select, TextInput } from "@mantine/core";

interface ITeamAdmin {
  id?: number;
}

const TeamAdmin = ({ id }: ITeamAdmin) => {
  const { data: team, isLoading } = useGetTeam(id);
  const { postTeam, isLoading: isLoadingTeam } = usePostTeam(id);

  const navigate = useNavigate();

  // const validateLogo = (values) => {
  //   const logoRegex =
  //     /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-])\/?$/;
  //   const logoPassedRegex = logoRegex.test(values.logo);
  //   if (!values.logo) {
  //     return "Logo is required";
  //   } else if (!logoPassedRegex) {
  //     return "Logo should be a URL";
  //   } else {
  //     return undefined;
  //   }
  // };

  const form = useForm<Omit<Team, "id">>({
    mode: "controlled",
    initialValues: {
      name: undefined,
      logo: undefined,
    },

    validate: (values) => {
      return {
        name: values.name ? undefined : "Name is required",
        logo: values.logo ? undefined : "Logo is required",
      };
    },
  });

  useEffect(() => {
    if (team) {
      form.setValues({
        name: team.name,
        logo: team.logo,
      });
    }
  }, [team]);

  return (
    <AdminAddEdit
      id={id}
      isLoading={isLoading}
      entityIsDefined={!!team}
      title="Team"
    >
      <LoadingOverlay visible={isLoadingTeam} />
      <form
        onSubmit={form.onSubmit((values) => {
          postTeam(values);
          navigate({ to: "/admin" });
        })}
        className="flex flex-col gap-4"
      >
        <TextInput id="name" label="Name" {...form.getInputProps("name")} />
        <TextInput id="logo" label="Logo" {...form.getInputProps("logo")} />

        <Button type="submit">Submit</Button>
      </form>
    </AdminAddEdit>
  );
};

export default TeamAdmin;
