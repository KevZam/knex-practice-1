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

    it("returns the id of a given item", () => {
      thirdId = 3;
      thirdItem = testProducts[thirdId - 1];

      return shoppingListService.getByID(db, thirdId).then(actual => {
        expect(actual).to.eql({
          id: thirdId,
          name: thirdItem.name,
          price: thirdItem.price,
          date_added: thirdItem.date_added,
          checked: thirdItem.checked,
          category: thirdItem.category
        });
      });
    });

    it("updates the item by a given id", () => {
      const idOfItemToUpdate = 3;
      const newInfo = {
        id: 3,
        name: "Salad",
        price: "2.50",
        date_added: new Date("2020-03-02T01:25:44.848Z"),
        checked: false,
        category: "Lunch"
      };

      return shoppingListService
        .updateItem(db, idOfItemToUpdate, newInfo)
        .then(() => shoppingListService.getByID(db, idOfItemToUpdate))
        .then(item => {
          console.log(item);
          expect(item).to.eql({
            id: idOfItemToUpdate,
            ...newInfo
          });
        });
    });
  });

  context("Given that the shoppin_list has no items", () => {
    it("should return an empty array", () => {
      return shoppingListService.getAllItems(db).then(actual => {
        expect(actual).to.eql([]);
      });
    });

    it("insertItem() should insert a new item and resolve it with an ID", () => {
      let newItem = {
        name: "NewItem",
        price: "2.50",
        date_added: new Date("2020-05-02T01:25:44.848Z"),
        checked: true,
        category: "Lunch"
      };
      return shoppingListService.insertItem(db, newItem).then(actual => {
        expect(actual).to.eql({
          id: 1,
          ...newItem
        });
      });
    });
  });
});
