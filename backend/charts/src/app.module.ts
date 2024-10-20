import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DemographicsModule } from "./modules/demographics/demographics.module";
import { Demographics } from "./modules/demographics/demographics.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5435,
      username: "user",
      password: "password",
      database: "mydatabase",
      entities: [Demographics],
      synchronize: false,
    }),
    DemographicsModule,
  ],
})
export class AppModule { }
