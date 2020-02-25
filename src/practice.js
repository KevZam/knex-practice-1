// knex is a SQL query builder and is used to connect to a database in your code. You also need the postgres driver
// "pg" so that knex knows what type of database you are connecting to. We then require dotenv which will give us access
// to the .env file so that we have access to the connection to the database through process.env
require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL
});

// There are lots of promise methods that knex has that will return promises you can chain off of. The then method
// is the one that will actually execute the query. This is the first point where the Node script will attempt to
// connect to the database, so this is where you'd see errors if the database or table doesn't exist.
/*
    knexInstance
			.from("amazong_products")
			.select("*")
			.then(result => {
				console.log(result);
		});
*/

// The first method returns the first object found that matches our query, it will return an object instead of an array
const qry = knexInstance
  .select("product_id", "name", "price", "category")
  .from("amazong_products")
  .where({ name: "Point of view gun" })
  .first()
  .toQuery();
// .then(result => {
//   console.log(result);
// });

const searchTerm = "holo";

function searchByProduceName(searchTerm) {
  knexInstance
    .select("product_id", "name", "price", "category")
    .from("amazong_products")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    });
}

searchByProduceName("holo");

// paginate the product list with this function. The offset is just where the count starts and the limit is how many
// products to show
function paginateProducts(page) {
  const productsPerPage = 10;
  const offset = productsPerPage * (page - 1);
  knexInstance
    .select("product_id", "name", "price", "category")
    .from("amazong_products")
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}

// We use whereNotNull() to specify not null in knex
function getProductsWithImages() {
  knexInstance
    .select("product_id", "name", "price", "category", "image")
    .from("amazong_products")
    .whereNotNull("image")
    .then(result => {
      console.log(result);
    });
}
