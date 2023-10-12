import { Field, ObjectType } from '@nestjs/graphql';

import { Player } from '../../../domain/models/player.model';

@ObjectType()
export class PlayerResource {
  @Field()
  readonly id!: string;

  @Field()
  readonly name: string;

  constructor(props: PlayerResource) {
    this.id = props.id;
    this.name = props.name;
  }

  static from(player: Player): PlayerResource {
    return new PlayerResource({
      id: player.id,
      name: player.name,
    });
  }
}
