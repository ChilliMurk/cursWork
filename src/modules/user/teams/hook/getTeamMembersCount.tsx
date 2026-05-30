import {Team} from "@/modules/user/teams/components/mockTeams.tsx";

export const getTeamMembersCount = (team: Team): number => {
    return team.membersList.length;
};
