import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "database-1.crk9irlfinkb.us-east-1.rds.amazonaws.com",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "postgres",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true, // This option automatically creates database tables based on the entities
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
