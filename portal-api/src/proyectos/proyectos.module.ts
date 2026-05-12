import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProyectoSchema } from './proyectos.schema';
import { ProyectosController } from './proyectos.controller';
import { ProyectosService } from './proyectos.service';
import { PermisoSchema } from '../permisos/permisos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Proyecto', schema: ProyectoSchema }]),
    MongooseModule.forFeature([{ name: 'Permiso', schema: PermisoSchema }]),
  ],
  controllers: [ProyectosController],
  providers: [ProyectosService],
  exports: [ProyectosService],
})
export class ProyectosModule {}
