const express = require("express");
const app = express();
app.use(require("morgan")("dev"));
app.use(express.json());
const PORT = process.env.PORT || 3000;

const {
    client,
    createTables,
    seedDatabase,
    createUser,
    fetchUsers,
    fetchProducts,
    fetchCarts,
} = require("./db.js");

require("./routes.js")(app);

const init = async () => {
    try {
        await client.connect();
        await createTables();
        await seedDatabase();

        console.log("DB seeded");

        const [moe, lucy, ethyl, curly] = await Promise.all([
            createUser({ username: "moe", password: "m_pw" }),
            createUser({ username: "lucy", password: "l_pw" }),
            createUser({ username: "ethyl", password: "e_pw" }),
            createUser({ username: "curly", password: "c_pw" }),
        ]);

        console.log(await fetchUsers());
        console.log(await fetchProducts());
        console.log(await fetchCarts());

        app.listen(PORT, () => {
            console.log(`Server started and listening on ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

init();
