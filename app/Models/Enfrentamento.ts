import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Enfrentamento extends BaseModel {
  @column({ isPrimary: true })
  public id_enfrentamiento: number

  @column()
  public jugadorone: number

  @column()
  public jugadortwo: number
  
  static EnfrentamientoModelo: any

  /*@column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime*/
}
