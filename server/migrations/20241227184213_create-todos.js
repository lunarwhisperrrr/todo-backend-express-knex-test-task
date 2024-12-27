
exports.up = function(knex) {
    return knex.schema.createTable('todos', function(table) {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.text('description');
        table.integer('order');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.boolean('completed').defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('todos');
};