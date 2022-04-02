import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Htod from 'App/Models/Htod'

export default class HistorialvodsController {
  public async index({ request, response }: HttpContextContract) {
    try{
      const historial = await Htod.all()
      return historial
    } catch {
      response.badRequest('No tienes autorizacion')
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const historial = new Htod()
    const enfrentamento = request.input('enfrentamento')
    const victoria = request.input('victoria')
    const derrota = request.input('derrota')
    try{
      historial.enfrentamiento = enfrentamento
      historial.victoria = victoria
      historial.derrota = derrota
      await historial.save()
      return response.status(200)
    } catch {
      return response.badRequest('Error al crear el tratamiento')
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const enfrentamento = request.input('enfrentamento')
    const victoria = request.input('victoria')
    const derrota = request.input('derrota')
    try {
      const historial = await Htod.findOrFail(params.id)
      historial.enfrentamiento = enfrentamento
      historial.victoria = victoria
      historial.derrota = derrota
      await historial.save()
      return response.status(200)
    } catch {
      response.badRequest('Error al actualizar')
    }
  }

  public async destroy({params, request, response}: HttpContextContract) {
    try {
      const historial = await Htod.findOrFail(params.id)
      await historial.delete()
      return response.status(200)
    } catch {
      response.badRequest('Error al borrar')
    }
  }
}
