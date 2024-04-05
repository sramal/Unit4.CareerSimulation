const pg = require("pg");
const client = new pg.Client(
    process.env.DATABASE_URL || "postgres://localhost/acme_ecommerce_db"
);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT || "shhh";

const { categories, products } = require("./data");

const createTables = async () => {
    await client.query(`
        DROP TABLE IF EXISTS cartItems CASCADE;
        DROP TABLE IF EXISTS products CASCADE;
        DROP TABLE IF EXISTS categories CASCADE;
        DROP TABLE IF EXISTS carts CASCADE;    
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS userTypes CASCADE;

        CREATE TABLE users(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            isadmin BOOLEAN DEFAULT FALSE
        );

        CREATE TABLE carts(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES users(id) NOT NULL,
            UNIQUE(user_id)
        );

        CREATE TABLE categories(
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            text VARCHAR(255) NOT NULL,
            image VARCHAR(255)
        );

        CREATE TABLE products(
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(255) NOT NULL,
            category_id SERIAL REFERENCES categories(id) NOT NULL,
            price NUMERIC NOT NULL,
            quantity INTEGER NOT NULL,
            image VARCHAR(255)
        );

        CREATE TABLE cartItems(
            id SERIAL PRIMARY KEY NOT NULL,
            cart_id UUID REFERENCES carts(id) NOT NULL,
            product_id SERIAL REFERENCES products(id) NOT NULL,
            quantity INTEGER DEFAULT 1
        );
    `);
};

// ################################################################################
// Carts
// ################################################################################
const createCart = async (user_id) => {
    const response = await client.query(
        `INSERT INTO carts(user_id) VALUES($1) RETURNING *;`,
        [user_id]
    );
    return response.rows[0];
};

const fetchCart = async (id) => {
    return (await client.query(`SELECT * FROM carts WHERE id = $1;`, [id]))
        .rows[0];
};

const fetchCarts = async () => {
    return (await client.query(`SELECT * FROM carts;`)).rows;
};

const deleteCartbyCartId = async (id) => {
    await client.query(`DELETE FROM carts WHERE id = $1`, [id]);
};

const deleteCartByUserId = async (id) => {
    await client.query(`DELETE FROM carts WHERE user_id = $1`, [id]);
};

// ################################################################################
// Users
// ################################################################################
const createUser = async ({ username, password, isAdmin }) => {
    const SQL = `
    INSERT INTO users(username, password, isadmin) VALUES($1, $2, $3) RETURNING *
  `;
    const response = await client.query(SQL, [
        username,
        await bcrypt.hash(password, 5),
        isAdmin,
    ]);

    await createCart(response.rows[0].id);

    return response.rows[0];
};

const registerUser = async ({ username, password }) => {
    const response = await createUser({
        username: username,
        password: password,
        isadmin: false,
    });
    if (!response.id) {
        const error = Error("not authorized");
        error.status = 401;
        throw error;
    }

    const token = jwt.sign({ id: response.id }, JWT);
    return { token };
};

const authenticate = async ({ username, password }) => {
    const SQL = `
    SELECT id, isadmin, username, password FROM users WHERE username=$1;
  `;
    const response = await client.query(SQL, [username]);

    if (
        !response.rows.length ||
        (await bcrypt.compare(password, response.rows[0].password)) === false
    ) {
        const error = Error("not authorized");
        error.status = 401;
        throw error;
    }

    const token = jwt.sign({ id: response.rows[0].id }, JWT);
    const id = response.rows[0].id;
    const isadmin = response.rows[0].isadmin;
    return { id, token, isadmin };
};

const findUserWithToken = async (token) => {
    const payload = jwt.verify(token, JWT);
    const SQL = `
    SELECT id, username, isAdmin FROM users WHERE id = $1;
  `;
    const response = await client.query(SQL, [payload.id]);
    if (!response.rows.length) {
        const error = Error("not authorized");
        error.status = 401;
        throw error;
    }
    return response.rows[0];
};

const checkCartAuthorization = async (cart_id, token) => {
    const payload = jwt.verify(token, JWT);
    const SQL = `
    SELECT * FROM carts WHERE user_id = $1;
  `;
    const response = await client.query(SQL, [payload.id]);
    if (!response.rows.length || response.rows.id !== cart_id) {
        return false;
    }

    return true;
};

const fetchUser = async (id) => {
    return (await client.query(`SELECT * FROM users WHERE id = $1;`, [id]))
        .rows[0];
};

const fetchUsers = async () => {
    return (await client.query(`SELECT * FROM users;`)).rows;
};

const deleteUser = async (id) => {
    await deleteCartByUserId(id);
    await client.query(`DELETE FROM users WHERE id = $1`, [id]);
};

// ################################################################################
// Categories
// ################################################################################
const createCategory = async ({ name, text, image }) => {
    const response = await client.query(
        `INSERT INTO categories(name, text, image) VALUES($1, $2, $3) RETURNING *;`,
        [name, text, image]
    );
    return response.rows[0];
};

const createCategories = async (categories) => {
    for (let i = 0; i < categories.length; i++) {
        await createCategory(categories[i]);
    }
};

const fetchCategory = async (id) => {
    return (await client.query(`SELECT * FROM categories WHERE id = $1;`, [id]))
        .rows[0];
};

const fetchCategoryId = async (name) => {
    return (
        await client.query(`SELECT id FROM categories WHERE name = $1;`, [name])
    ).rows[0].id;
};

const fetchCategories = async () => {
    const response = await client.query(`SELECT * FROM categories;`);
    return response.rows;
};

const deleteCategory = async (id) => {
    await client.query(`DELETE FROM categories WHERE id = $1`, [id]);
};

// ################################################################################
// Products
// ################################################################################
const createProduct = async (product) => {
    const category_id = await fetchCategoryId(product.category);
    const response = await client.query(
        `INSERT INTO products(title, category_id, price, quantity, image) VALUES($1, $2, $3, $4, $5) RETURNING *;`,
        [
            product.title,
            category_id,
            product.price,
            product.quantity,
            product.image,
        ]
    );
    return response.rows[0];
};

const createProducts = async (products) => {
    for (let i = 0; i < products.length; i++) {
        await createProduct(products[i]);
    }
};

const fetchProduct = async (id) => {
    return (await client.query(`SELECT * FROM products WHERE id = $1;`, [id]))
        .rows[0];
};

const fetchProducts = async () => {
    const response = await client.query(
        `SELECT * FROM products ORDER BY title ASC;`
    );
    return response.rows;
};

const deleteProduct = async (id) => {
    await client.query(`DELETE FROM products WHERE id = $1`, [id]);
};

const addToProductQuantity = async (id, quantity) => {
    const currentQuantity = (await fetchProduct(id)).quantity;
    return (
        await client.query(
            `UPDATE products SET quantity = $1 WHERE id = $2 RETURNING *;`,
            [currentQuantity + quantity, id]
        )
    ).rows[0];
};

// ################################################################################
// cartItems
// ################################################################################
const getUserId = async (cart_id) => {
    const response = await client.query(`SELECT * FROM carts WHERE id = $1;`, [
        cart_id,
    ]);
    return response.rows[0].user_id;
};

const getCartId = async (user_id) => {
    const response = await client.query(
        `SELECT * FROM carts WHERE user_id = $1;`,
        [user_id]
    );
    return response.rows[0].id;
};

const fetchCartItemQuantity = async (cart_id, product_id) => {
    const response = await client.query(
        `SELECT quantity FROM cartItems WHERE cart_id = $1 AND product_id = $2;`,
        [cart_id, product_id]
    );
    return response.rowCount ? response.rows[0].quantity : 0;
};

const updateCartItemQuantity = async (cart_id, product_id, quantity) => {
    return (
        await client.query(
            `UPDATE cartItems SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *;`,
            [quantity, cart_id, product_id]
        )
    ).rows[0];
};

const addProductToCart = async (cart_id, product_id, quantity) => {
    let currentQuantity = await fetchCartItemQuantity(cart_id, product_id);
    let response;
    if (currentQuantity === 0) {
        response = await client.query(
            `INSERT INTO cartItems(cart_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *;`,
            [cart_id, product_id, quantity]
        );

        await addToProductQuantity(product_id, -quantity);

        return quantity;
    } else {
        response = await updateCartItemQuantity(
            cart_id,
            product_id,
            currentQuantity + quantity
        );

        await addToProductQuantity(product_id, -quantity);

        return currentQuantity + quantity;
    }
};

const fetchCartItem = async (id) => {
    const response = await client.query(
        `SELECT * FROM cartItems WHERE id = $1;`,
        [id]
    );

    return response.rows[0];
};

const fetchCartItems = async (cart_id) => {
    const response = await client.query(
        `SELECT * FROM cartItems WHERE cart_id = $1;`,
        [cart_id]
    );

    return response.rows;
};

const deleteCartItem = async (cart_id, product_id) => {
    await client.query(
        `DELETE FROM cartItems WHERE cart_id = $1 and product_id = $2;`,
        [cart_id, product_id]
    );
};

const seedDatabase = async () => {
    await createCategories(categories);
    await createProducts(products);
};

module.exports = {
    client,
    createTables,
    createUser,
    authenticate,
    registerUser,
    findUserWithToken,
    fetchUser,
    fetchUsers,
    deleteUser,
    createCategory,
    createCategories,
    fetchCategory,
    fetchCategories,
    deleteCategory,
    createProduct,
    createProducts,
    fetchProduct,
    fetchProducts,
    deleteProduct,
    addToProductQuantity,
    createCart,
    fetchCart,
    fetchCarts,
    deleteCartbyCartId,
    deleteCartByUserId,
    addProductToCart,
    fetchCartItem,
    fetchCartItems,
    getUserId,
    getCartId,
    fetchCartItemQuantity,
    deleteCartItem,
    seedDatabase,
    checkCartAuthorization,
};
