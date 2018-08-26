import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Authentication')
    .setDescription('The Authentication API description')
    .setVersion('1.0')
    .addTag('auth')
    .setBasePath('/auth')
    .setTitle('Ranks')
    .setDescription('  The Ranks API description')
    .setVersion('1.0')
    .addTag('ranks')
    .setBasePath('/ranks')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
})();
