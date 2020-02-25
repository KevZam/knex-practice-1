const knex = require("knex");
const shoppingListService = require("../src/shopping-list-service");

describe("Shopping list service object", () => {
  let db;

  let testProducts = [
    {
      id: 1,
      name: "Apples",
      price: "3.99",
      date_added: new Date("2020-02-02T01:25:44.848Z"),
      checked: true,
      category: "Snack"
    },
    {
      id: 2,
      name: "Steak",
      price: "20.99",
      date_added: new Date("2020-04-02T01:25:44.848Z"),
      checked: false,
      category: "Main"
    },
    {
      id: 3,
      name: "Salad",
      price: "2.50",
      date_added: new Date("2020-03-02T01:25:44.848Z"),
      checked: true,
      category: "Lunch"
    }
  ];

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
  });

  before(() => db("shopping_list").truncate());

  afterEach(() => db("shopping_list").truncate());

  after(() => db.destroy());

  context("Given that the shopping_list has items", () => {
    beforeEach(() => {
      return db.into("shopping_list").insert(testProducts);
    });

    it(`resolves all items from the shopping list`, () => {
      return shoppingListService.getAllItems(db).then(actual => {
        expect(actual).to.eql(testProducts);
      });
    });
  });
});
