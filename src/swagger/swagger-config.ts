import { DocumentBuilder } from "@nestjs/swagger";

export const SwaggerConfig = new DocumentBuilder()
    .setTitle('Library API')
    .setDescription('An API Service for library management')
    .setVersion('2.0')
    .build();