import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Htod extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public enfrentamiento: number

  @column()
  public victoria: string

  @column()
  public derrota: string

  /*@column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime*/
}
