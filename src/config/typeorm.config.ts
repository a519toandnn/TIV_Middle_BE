import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const typeOrmConfig = (configService: ConfigService) : TypeOrmModuleOptions => ({
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT') || 3306,
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    type: 'mysql',
    entities: [join(__dirname, '..', '**', '*.entity.{js,ts}')],
    migrations: ['dist/migrations/*.{js,ts}'],
    migrationsRun: true,
    synchronize: true,
    autoLoadEntities: true,
});