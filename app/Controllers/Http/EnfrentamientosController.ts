import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Enfrentamento from 'App/Models/Enfrentamento'

export default class EnfrentamientosController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const enfrentamiento = await Database.query().select('enfre.id_encuentro as id','local.Nombre_Equipo as Local','visitante.Nombre_Equipo as Visitante','estadio.Nombre_Estadio as Estadio')
      .from('enfrentamientos as enfre')
      .join('users as jugadoruno','enfre.jugadorone','=','jugadoruno.id')
      .join('users as jugadordos','enfre.jugadortwo','=','jugadordos.id')
      return enfrentamiento
    } catch {
      response.badRequest('No tienes autorizacion')
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
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

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const jugadorone = request.input('jugadorone')
    const jugadortwo = request.input('jugadortwo')
    try {
      const enfrentamento = await Enfrentamento.findOrFail(params.id)
      enfrentamento.jugadorone = jugadorone
      enfrentamento.jugadortwo = jugadortwo
      await enfrentamento.save()
      return response.status(200)
    } catch {
      response.badRequest('Error al actualizar')
    }
  }

  public async destroy({params, request, response}: HttpContextContract) {
    try {
      const enfrentamento = await Enfrentamento.findOrFail(params.id)
      await enfrentamento.delete()
      return response.status(200)
    } catch {
      response.badRequest('Error al borrar')
    }
  }
}
