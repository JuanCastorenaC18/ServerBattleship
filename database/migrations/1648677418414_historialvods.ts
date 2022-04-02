import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Historialvods extends BaseSchema {
  protected tableName = 'historialvods'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_historial').primary()
      table.integer('enfrentamiento').unsigned().references('id_enfrentamiento').inTable('enfrentamentos').onDelete('CASCADE').notNullable()
      table.string('victoria')
      table.string('derrota')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
