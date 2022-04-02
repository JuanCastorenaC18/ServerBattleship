import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database"
import EnfrentamientoModelo from 'App/Models/EnfrentamientoModelo'
import Enfrentamento from 'App/Models/Enfrentamento'
import mongoose from "mongoose"

export default class MongosController {

  public async guardarMongo({request,response})
    {
      await mongoose.connect('mongodb+srv://JuanCastorena:Juan1812@bdone.9jf7x.mongodb.net/battleship?retryWrites=true&w=majority')
        const id=request.input('id_encuentro')
        const jugadorone=request.input('jugadorone')
        const jugadortwo=request.input('jugadortwo')
        console.log(id)
        const crear=new Enfrentamento.EnfrentamientoModelo({"id_partido":id,"ataquejugadoruno":[jugadorone],"ataquejugadordos":[jugadortwo]})
        crear.save()
        return response.json(crear)
    }
    public async insertar({request,response})
    {
        try
        {
            const enfrentamento=new Enfrentamento()
            const jugadoruno=request.input('jugadorone')
            const jugadordos=request.input('jugadortwo')
            enfrentamento.jugadorone=jugadoruno
            enfrentamento.jugadortwo=jugadordos
            await enfrentamento.save()
            return response.status(200)
        }
        catch
        {
            return response.status(500)
        }
    }
    public async modificar({request,response})
    {
        try
        {
          await mongoose.connect('mongodb+srv://JuanCastorena:Juan1812@bdone.9jf7x.mongodb.net/battleship?retryWrites=true&w=majority')
          const id=request.input('id_encuentro')
          const jugadorone=request.input('jugadorone')
          const jugadortwo=request.input('jugadortwo')
          console.log(id)
          response= await Enfrentamento.EnfrentamientoModelo.updateOne({"id_partido":id,"ataquejugadoruno":[jugadorone],"ataquejugadordos":[jugadortwo]})
          return response
        }
        catch
        {
            return  response.badRequest('Hubo un error')
        }
    }
    public async verPartido()
    {
        const enfrentamento=Database.query()
        .select('enfre.id_encuentro as id','local.Nombre_Equipo as Local','visitante.Nombre_Equipo as Visitante','estadio.Nombre_Estadio as Estadio')
        .from('enfrentamientos as enfre')
        .join('users as jugadoruno','enfre.jugadorone','=','jugadoruno.id')
        .join('users as jugadordos','enfre.jugadortwo','=','jugadordos.id')
        return enfrentamento
    }
    public async verComent({params,response})
    {
        await mongoose.connect('mongodb+srv://JuanCastorena:Juan1812@bdone.9jf7x.mongodb.net/battleship?retryWrites=true&w=majority')
        response=await  Enfrentamento.EnfrentamientoModelo.find({"id_partido":params.id})
        return response
    } 
    public async delete({auth,response,params})
    {
        try
        {
            await auth.use('api').authenticate()
            const Enfrentamiento=await Enfrentamento.findOrFail(params.id)
            await Enfrentamiento.delete()
            
        }catch
        {
            return response.badRequest('ERROR')
        }
    }

  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
