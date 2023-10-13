import { Team } from "../models/team.model";

export interface TeamService {
  getTeam(id: string): Team;
}
