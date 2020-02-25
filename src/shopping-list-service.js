const shoppingListService = {
  // Read (get)
  getAllItems(knex) {
    return knex.select("*").from("shopping_list");
  }
  // Create

  // Update

  // Delete
};

module.exports = shoppingListService;
