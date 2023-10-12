import { NestFactory } from '@nestjs/core';
import { Logger, Params, PinoLogger } from 'nestjs-pino';

import { AppOptions, CONFIG } from './config';
import { MainModule } from './main.module';

export class Main {
  static async run(): Promise<void> {
    const logger = new Logger(new PinoLogger(CONFIG.LOGGER() as Params), {});
    const options = CONFIG.APP() as AppOptions;

    try {
      const app = await NestFactory.create(MainModule, {
        bufferLogs: true,
        // Maybe something goes here
      });

      app.enableCors({ origin: options.allowedOrigins || false });
      // graphql does not register route name globally so middleware never gets applied if it's not excluded
      app.setGlobalPrefix(options.prefix, { exclude: ['graphql'] });
      app.useLogger(logger);
      app.flushLogs();

      app.enableShutdownHooks();

      await app.listen(options.port, options.host);
    } catch (error) {
      logger.error(`${MainModule.name}: failed`);
      logger.error(error);
      process.exit(1);
    }
  }
}

Main.run();
