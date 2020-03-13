import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MensajesController } from './controllers/mensajes/mensajes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensaje } from './entity/mensaje.entity';
import { MensajesService } from './services/mensajes/mensajes.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nest',
      password: 'app',
      database: 'sendmeapp_db',
      entities: [Mensaje],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Mensaje]) // for repositorie
  ],
  controllers: [AppController, MensajesController],
  providers: [AppService,MensajesService],
})
export class AppModule {}
