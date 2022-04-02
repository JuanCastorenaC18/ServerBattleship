import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {

  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const user = await User.query()
        .where('email', email)
        .where('password', password)
        .firstOrFail()
      const token = await (await auth.use('api').generate(user))
      const tokenrol = {
        id_user: user.id,
        username: user.username,
        token: token
      }
      return tokenrol
    } catch {
      return response.badRequest('El correo o la contraseña es incorrecta')
    }
  }

  public async logout({ auth, response }) {
    try
        {
            await auth.use('api').authenticate()
            await auth.use('api').revoke()
            return true
        }catch{
            return response.badRequest('No existe el usuario')
        }
  }

  public async tknvalidacion({ auth }) {
    try {
      await auth.use('api').authenticate()
      return true
    } catch {
      return false
    }
  }

  public async rolvalidacion({ auth, response }) {
    try {
      await auth.use('api').authenticate()
      const rol = auth.use('api').user.$attributes.rol
      if (rol == 1) {
        return true
      } else {
        return false
      }
    } catch {
      return response.badRequest('El usuario no tiene acceso')
    }
  }

  public async getUser({ auth }) {
    await auth.use('api').authenticate()
    const user = auth.use('api').user.$attributes
    return user
  }
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
