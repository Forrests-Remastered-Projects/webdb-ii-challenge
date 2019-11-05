exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();
    tbl.string("make"); //make this not nullable
    tbl
      .string("vin")
      .notNullable()
      .unique();
    tbl.string("model").notNullable();
    tbl.string("mileage").notNullable();
    tbl.string("transmission");
    tbl.string("status");
  });
};

exports.down = function(knex) {
  return knex.dropTableIfExists("cars");
};
