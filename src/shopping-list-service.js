const shoppingListService = {
  // Read (get)
  getAllItems(knex) {
    return knex.select("*").from("shopping_list");
  },
  // Create
  insertItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into("shopping_list")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  // Get by ID
  getByID(knex, itemID) {
    return knex
      .select("*")
      .from("shopping_list")
      .where("id", itemID)
      .first();
  },
  // Update
  updateItem(knex, id, newItemInfo) {
    return knex("shopping_list")
      .where({ id })
      .update(newItemInfo);
  },
  // Delete
  deleteItem(knex, id) {
    return knex("shopping_list")
      .where({ id })
      .delete();
  }
};

module.exports = shoppingListService;
