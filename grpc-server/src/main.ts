import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MicroserviceOptions } from '@nestjs/microservices';

const logger = new Logger('Main');
// const microserviceOptions = {
//   transport: Transport.GRPC,
//   options: {
//     url: 'localhost:50052',
//     package: 'app',
//     protoPath: join(__dirname, '../src/app.proto'),
//   },
// };

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);
//   app.listen();
// }
async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
  );
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50052',
      package: 'app',
      protoPath: join(__dirname, '../src/app.proto'),
    },
  })
  await app.startAllMicroservices();
  await app.listen(3001, '0.0.0.0');
}
bootstrap();