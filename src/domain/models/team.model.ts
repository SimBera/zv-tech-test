import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Team {
  @Field()
  id!: string;
}