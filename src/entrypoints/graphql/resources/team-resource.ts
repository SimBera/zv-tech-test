import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class TeamResource {
  @Field()
  @Directive('@external')
  readonly id!: string;
}
