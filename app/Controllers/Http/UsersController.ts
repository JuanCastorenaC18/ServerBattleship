import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const user = new User()
    const username = request.input('username')
    const email = request.input('email')
    const password = request.input('password')
    try {
      user.username = username
      user.email = email
      user.password = password
      
      await user.save()
      return response.status(200)
    } catch {
      return response.badRequest('Error al crear el usuario')
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
