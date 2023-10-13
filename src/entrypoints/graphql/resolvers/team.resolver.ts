import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Team } from '../../../domain/models/team.model';
import { PlayerServiceImpl } from '../../../domain/services/player.service';
import { TeamServiceImpl } from '../../../domain/services/team.service';
import { PlayerResource } from '../resources/player-resource';
import { TeamResource } from '../resources/team-resource';

@Resolver(() => TeamResource)
export class TeamResolver {
  constructor(
    private readonly playerService: PlayerServiceImpl,
    private readonly teamService: TeamServiceImpl,
  ) {}

  @Query(() => TeamResource)
  async team(@Args('id', { type: () => 'id' }) id: string): Promise<Team> {
    return this.teamService.getTeam(id);
  }

  @ResolveField('players', () => [PlayerResource])
  async players(@Parent() team: Team): Promise<PlayerResource[]> {
    const players = await this.playerService.findPlayersByTeamId(team.id);

    return players.map((player) => PlayerResource.from(player));
  }
}
