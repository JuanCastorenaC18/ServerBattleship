import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Enfrentamentos extends BaseSchema {
  protected tableName = 'enfrentamentos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_enfrentamiento').primary()
      table.integer('jugadorone').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.integer('jugadortwo').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
