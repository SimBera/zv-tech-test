import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Player {
  @Field()
  id!: string;

  @Field()
  name!: string;
}
