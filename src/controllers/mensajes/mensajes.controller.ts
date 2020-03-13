import { Controller, Post, Body, Get, Put, Delete, Res, Param } from '@nestjs/common';
import { MensajeDto } from 'src/dto/mensaje.dto';
import { MensajesService } from 'src/services/mensajes/mensajes.service';

@Controller('mensajes')
export class MensajesController {

    constructor(private mensajeServices: MensajesService) {}

    @Post()
    create(@Body() mensajeDto: MensajeDto, @Res() response) {
        this.mensajeServices.createMensaje(mensajeDto)
        .then(res => {
            response.status(201).json(res);
        })
        .catch(err => {
            response.status(400).json({mensaje: 'Error al insertar mensaje'})
        });
    }

    @Get()
    getAll(@Res() response) {
        this.mensajeServices.getAll()
        .then(res => {
            response.status(200).json(res);
        })
        .catch(err => {
            response.status(400).json({mensaje: 'Error al consultar mensajes'})
        });
    }

    @Get(':id')
    getById(@Param('id') idMensaje: number ,@Res() response) {
        this.mensajeServices.getById(idMensaje)
        .then(res => {
            console.log(idMensaje,' ',JSON.stringify(res))
            if (res) {
                response.status(200).json(res);
            } else {
                response.status(404).json({mensaje: 'Error el mensaje no existe'})
            }
        })
        .catch(err => {
            response.status(400).json({mensaje: 'Error al consultar el mensaje'})
        });
    }

    @Put(':id')
    updateMaesage(
        @Body() mensajeDto: MensajeDto,
        @Res() response,
        @Param() idMensaje: number
        ) {
        this.mensajeServices.updateMensaje(idMensaje,mensajeDto)
        .then(res => {
            response.status(200).json(res);
        })
        .catch(err => {
            response.status(400).json({mensaje: 'Error al modificar el mensaje'})
        });
    }

    @Delete(':id')
    deleteMensage(@Res() response,  @Param() idMensaje: number) {
        this.mensajeServices.deleteMensaje(idMensaje)
        .then(res => {
            response.status(200).json(res);
        })
        .catch(err => {
            response.status(400).json({mensaje: 'Error al eliminar el mensaje'})
        });
    }

}
