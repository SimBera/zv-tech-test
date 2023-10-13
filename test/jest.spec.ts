import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import { CONFIG } from '../src/config';
import { Player } from '../src/domain/models/player.model';
import { PlayerServiceImpl } from '../src/domain/services/player.service';
import { factory } from '../src/framework/provider';
import { PlayerEntity } from '../src/infrastructure/persistence/entities/player';
import { PlayerRepositoryImpl } from '../src/infrastructure/persistence/repositories/player';

describe('PlayerService', () => {
  let playerServiceImpl: PlayerServiceImpl;
  let playerRepositoryImpl: PlayerRepositoryImpl;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: Object.values(CONFIG), isGlobal: true }),
        MikroOrmModule.forRoot({
          contextName: 'TEST',
          dbName: ':memory:',
          type: 'postgresql',
          entities: ['dist/infrastructure/persistence/entities/*.js'],
          entitiesTs: ['src/infrastructure/persistence/entities/*.ts'],
          allowGlobalContext: false,
          forceUndefined: true,
          debug: false,
        }),
        MikroOrmModule.forFeature({ entities: [PlayerEntity], contextName: 'TEST' }),
        MikroOrmModule.forMiddleware(),
      ],
      providers: [factory(PlayerServiceImpl, [PlayerRepositoryImpl])],
    }).compile();

    playerServiceImpl = moduleRef.get<PlayerServiceImpl>(PlayerServiceImpl);
    playerRepositoryImpl = moduleRef.get<PlayerRepositoryImpl>(PlayerRepositoryImpl);
  });

  describe('getPlayer', () => {
    test('should return a player', async () => {
      const result: Player = {
        id: 'H4Sh',
        name: 'Simas',
      };
      jest.spyOn(playerRepositoryImpl, 'getOneById').mockImplementation(async () => result);

      expect(await playerServiceImpl.getPlayer(result.id)).toBe(result);
    });
  });

  describe('createPlayer', () => {
    test('should create a player', async () => {
      const result: Player = {
        id: 'H4Sh',
        name: 'Simas',
      };
      jest.spyOn(playerRepositoryImpl, 'createOne').mockImplementation(async () => result);

      expect(await playerServiceImpl.createPlayer(result.name)).toBe(result);
    });
  });

  describe('deletePlayer', () => {
    test('should delete a player', async () => {
      const result: Player = {
        id: 'H4Sh',
        name: 'Simas',
      };
      const deleteSpy = jest.spyOn(playerRepositoryImpl, 'deleteOne').mockImplementation();
      await playerServiceImpl.deletePlayer(result.id);
      expect(deleteSpy).toHaveBeenCalledTimes(1);
    });
  });
});
