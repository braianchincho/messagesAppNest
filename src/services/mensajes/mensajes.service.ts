import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensaje } from 'src/entity/mensaje.entity';
import { Repository } from 'typeorm';
import { MensajeDto } from 'src/dto/mensaje.dto';

@Injectable()
export class MensajesService {
    constructor(
        @InjectRepository(Mensaje)
        private readonly mensajeRepository: Repository<Mensaje>
    ) {}

    async getAll(): Promise<MensajeDto[]> {
        return await this.mensajeRepository.find();
    }

    async getById(idMensaje: number): Promise<MensajeDto> {
        return await this.mensajeRepository.findOne(idMensaje);
    }

    async createMensaje(mensajeDto: MensajeDto): Promise<MensajeDto> {
        const mensaje = new Mensaje();
        mensaje.mensaje = mensajeDto.mensaje;
        mensaje.nick = mensajeDto.nick;
        return await this.mensajeRepository.save(mensaje);
    }

    async updateMensaje(id:number,mensajeDto: MensajeDto): Promise<MensajeDto> {
        const mensaje: Mensaje = await this.mensajeRepository.findOne(id);
        mensaje.mensaje = mensajeDto.mensaje;
        mensaje.nick = mensajeDto.nick;
        return await this.mensajeRepository.save(mensaje);
    }

    async deleteMensaje(id:number): Promise<any> {
        return await this.mensajeRepository.delete(id);
    }
}
