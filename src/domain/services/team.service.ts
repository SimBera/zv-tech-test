import { TeamService } from '../capabilities/team-service';
import { Team } from '../models/team.model';

export class TeamServiceImpl implements TeamService {
  getTeam(id: string): Team {
    return { id: 1 } as unknown as Team
  }
}
