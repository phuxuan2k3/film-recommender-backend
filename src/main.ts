import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { CatchEverythingFilter } from './common/ex-filter';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new CatchEverythingFilter(app.get(HttpAdapterHost)));
  app.enableVersioning({ type: VersioningType.URI })
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
