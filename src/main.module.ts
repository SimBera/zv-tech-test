import { Options } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule, Params } from 'nestjs-pino';

import { CONFIG } from './config';
import { PlayerServiceImpl } from './domain/services/player.service';
import { PlayerResolver } from './entrypoints/graphql/resolvers/player.resolver';
import { factory } from './framework/provider';
import { GraphqlModule } from './infrastructure/graphql/graphql.module';
import { HealthCheckModule } from './infrastructure/health-check/module';
import { PlayerEntity } from './infrastructure/persistence/entities/player';
import { PlayerRepositoryImpl } from './infrastructure/persistence/repositories/player';

@Module({
  imports: [
    ConfigModule.forRoot({ load: Object.values(CONFIG), isGlobal: true }),
    MikroOrmModule.forRoot({ ...(CONFIG.DB() as Options), registerRequestContext: false }),
    MikroOrmModule.forFeature({ entities: [PlayerEntity], contextName: 'MAIN' }),
    MikroOrmModule.forMiddleware(),
    GraphqlModule,
    LoggerModule.forRoot(CONFIG.LOGGER() as Params),
    HealthCheckModule,
  ],
  providers: [factory(PlayerServiceImpl, [PlayerRepositoryImpl]), factory(PlayerResolver, [PlayerServiceImpl])],
  controllers: [],
})
export class MainModule {}
