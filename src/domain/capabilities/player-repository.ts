import { Player } from '../models/player.model';

export interface PlayerRepository {
  getOneById(id: string): Promise<Player>;

  createOne(name: string): Promise<Player>;

  deleteOne(player: Player): Promise<void>;

  findPlayersByTeamId(teamId: string): Promise<Player[]>;
}
