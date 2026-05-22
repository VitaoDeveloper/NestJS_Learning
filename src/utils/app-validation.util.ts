import { ValidationPipe } from "@nestjs/common";

export const AppValidation: ValidationPipe = new ValidationPipe({
    whitelist: true,
    transform: true
})