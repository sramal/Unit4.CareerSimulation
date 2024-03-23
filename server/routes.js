const {
    createUser,
    authenticate,
    registerUser,
    findUserWithToken,
    fetchUser,
    fetchUsers,
    deleteUser,
    fetchCategories,
    fetchCategory,
    createCategory,
    deleteCategory,
    createCart,
    fetchCart,
    fetchCarts,
    deleteCartbyCartId,
    deleteCartByUserId,
    createProduct,
    fetchProducts,
    deleteProduct,
    addProductToCart,
    fetchCartItems,
    getCartId,
    deleteCartItem,
} = require("./db");

module.exports = (app) => {
    // routes for users
    const isLoggedIn = async (req, res, next) => {
        try {
            req.user = await findUserWithToken(req.headers.authorization);
            next();
        } catch (error) {
            next(error);
        }
    };

    app.post("/api/auth/login", async (req, res, next) => {
        try {
            res.send(await authenticate(req.body));
        } catch (ex) {
            next(ex);
        }
    });

    app.post("/api/auth/register", async (req, res, next) => {
        try {
            res.send(await registerUser(req.body));
        } catch (ex) {
            next(ex);
        }
    });

    app.get("/api/auth/me", async (req, res, next) => {
        try {
            res.send(await findUserWithToken(req.headers.authorization));
        } catch (ex) {
            next(ex);
        }
    });

    app.get("/api/users", async (req, res, next) => {
        try {
            res.send(await fetchUsers());
        } catch (ex) {
            next(ex);
        }
    });

    app.post("/api/users/:id/products/:product_id", async (req, res, next) => {
        try {
            await addProductToCart(
                req.params.id,
                req.params.product_id,
                req.body.quantity
            );
            res.sendStatus(201);
        } catch (ex) {
            next(ex);
        }
    });

    app.delete(
        "/api/users/:id/products/:product_id",
        async (req, res, next) => {
            try {
                const cart_id = await getCartId(req.params.id);
                await deleteCartItem(cart_id, req.params.product_id);
                res.sendStatus(204);
            } catch (ex) {
                next(ex);
            }
        }
    );

    app.get("/api/users/:id/carts", async (req, res, next) => {
        try {
            const cart_id = await getCartId(req.params.id);
            res.send(await fetchCartItems(cart_id));
        } catch (ex) {
            next(ex);
        }
    });

    // routes for categories
    app.get("/api/categories", async (req, res, next) => {
        try {
            res.send(await fetchCategories());
        } catch (error) {
            next(error);
        }
    });

    app.get("/api/categories/:id", async (req, res, next) => {
        try {
            res.send(await fetchCategory(req.params.id));
        } catch (error) {
            next(error);
        }
    });

    app.post("/api/categories", async (req, res, next) => {
        try {
            res.status(201).send(await createCategory(req.body.name));
        } catch (error) {
            next(error);
        }
    });

    app.delete("/api/categories/:id", async (req, res, next) => {
        try {
            await deleteCategory(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    });

    // routes for products
    app.get("/api/products", async (req, res, next) => {
        try {
            res.send(await fetchProducts());
        } catch (error) {
            next(error);
        }
    });

    app.post("/api/products", async (req, res, next) => {
        try {
            res.status(201).send(await createProduct(req.body));
        } catch (error) {
            next(error);
        }
    });

    app.delete("/api/products/:id", async (req, res, next) => {
        try {
            await deleteProduct(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    });

    // routes for carts
    app.get("/api/carts", async (req, res, next) => {
        try {
            res.send(await fetchCarts());
        } catch (error) {
            next(error);
        }
    });

    app.get("/api/carts/:user_id", async (req, res, next) => {
        try {
            res.send(await fetchCart(req.params.user_id));
        } catch (error) {
            next(error);
        }
    });

    app.delete("/api/carts/:id", async (req, res, next) => {
        try {
            await deleteCartbyCartId(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    });
};
