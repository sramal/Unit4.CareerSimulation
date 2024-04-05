const express = require("express");
const cors = require("cors");
const app = express();
app.use(require("morgan")("dev"));
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

const {
    client,
    createTables,
    seedDatabase,
    createUser,
    fetchUsers,
    fetchProducts,
    fetchCarts,
    fetchCategories,
} = require("./db.js");

require("./routes.js")(app);

const init = async () => {
    try {
        await client.connect();
        await createTables();
        await seedDatabase();

        console.log("DB seeded");

        const [larry, curly, moe] = await Promise.all([
            createUser({ username: "larry", password: "l_pw", isAdmin: true }),
            createUser({ username: "curly", password: "c_pw", isAdmin: false }),
            createUser({ username: "moe", password: "m_pw", isAdmin: false }),
        ]);

        console.log(await fetchUsers());
        console.log(await fetchProducts());
        console.log(await fetchCarts());
        console.log(await fetchCategories());

        app.listen(PORT, () => {
            console.log(`Server started and listening on ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

init();
