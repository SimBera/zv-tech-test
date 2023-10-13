import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { PlayerServiceImpl } from '../../../domain/services/player.service';
import { PlayerResource } from '../resources/player-resource';
import { TeamResource } from '../resources/team-resource';
import { Team } from '../../../domain/models/team.model';
import { TeamServiceImpl } from '../../../domain/services/team.service';

@Resolver(() => TeamResource)
export class TeamResolver {
  constructor(
    private readonly playerService: PlayerServiceImpl,
    private readonly teamService: TeamServiceImpl
  ) { }

  @Query(() => TeamResource)
  async team(@Args('id', { type: () => 'id' }) id: string) {
    return this.teamService.getTeam(id);
  }

  @ResolveField('players', () => [PlayerResource])
  async players(@Parent() team: Team): Promise<PlayerResource[]> {
    const players = await this.playerService.findPlayersByTeamId(team.id)

    return players.map(player => PlayerResource.from(player));
  }

}
