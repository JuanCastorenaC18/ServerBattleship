import { DateTime } from 'luxon'
import mongoose from 'mongoose'
import {Schema,model} from 'mongoose'
export default class PartidoModelo {
  
  static enfrentamientosschema=new Schema({
    id_partido:Number,
    jugador1:Array,
    jugador2:Array
  },{
    versionKey:false
  });
  static EnfrentamientoModelo:any=model('Enfrentamientos',this.enfrentamientosschema)
}
