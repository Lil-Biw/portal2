"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const corsOrigin = process.env.CORS_ORIGIN || '*';
    const origin = corsOrigin === '*'
        ? '*'
        : corsOrigin.split(',').map((item) => item.trim()).filter(Boolean);
    app.enableCors({
        origin,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Portal API corriendo en http://localhost:${port}/api/v1`);
}
bootstrap();
//# sourceMappingURL=main.js.map