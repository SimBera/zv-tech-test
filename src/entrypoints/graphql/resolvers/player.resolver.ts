import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PlayerServiceImpl } from '../../../domain/services/player.service';
import { PlayerResource } from '../resources/player-resource';

@Resolver(() => PlayerResource)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerServiceImpl) {}

  @Query((returns) => PlayerResource)
  async player(@Args('id') id: string): Promise<PlayerResource> {
    const player = await this.playerService.getPlayer(id);
    return PlayerResource.from(player);
  }

  @Mutation((returns) => PlayerResource)
  async createPlayer(@Args('name') name: string): Promise<PlayerResource> {
    const player = await this.playerService.createPlayer(name);
    return PlayerResource.from(player);
  }

  @Mutation(() => Boolean)
  async deletePlayer(@Args('id') id: string): Promise<boolean> {
    await this.playerService.deletePlayer(id);
    return true;
  }
}
