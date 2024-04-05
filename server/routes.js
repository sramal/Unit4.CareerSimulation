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
    addToProductQuantity,
    addProductToCart,
    fetchCartItems,
    getUserId,
    getCartId,
    fetchCartItemQuantity,
    deleteCartItem,
    checkCartAuthorization,
    fetchCartItem,
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
            const user = await authenticate(req.body);
            const cart_id = await getCartId(user.id);
            const cart_items = await fetchCartItems(cart_id);
            res.send({
                token: user.token,
                isadmin: user.isadmin,
                cart_id: cart_id,
                cart_items: cart_items,
            });
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
            const categories = await fetchCategories();
            res.send({ categories });
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
            res.status(201).send(await createCategory(req.body));
        } catch (error) {
            next(error);
        }
    });

    app.delete("/api/categories/:id", async (req, res, next) => {
        try {
            const user = await findUserWithToken(req.headers.authorization);
            if (user.isadmin) {
                await deleteCategory(req.params.id);
                res.sendStatus(204);
            } else {
                res.sendStatus(401);
            }
        } catch (error) {
            next(error);
        }
    });

    // routes for products
    app.get("/api/products", async (req, res, next) => {
        try {
            const products = await fetchProducts();
            res.send({ products });
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
            const user = await findUserWithToken(req.headers.authorization);
            if (user.isadmin) {
                await deleteProduct(req.params.id);
                res.sendStatus(204);
            } else {
                res.sendStatus(401);
            }
        } catch (error) {
            next(error);
        }
    });

    // routes for cartItems
    app.get("/api/carts", async (req, res, next) => {
        try {
            res.send(await fetchCarts());
        } catch (error) {
            next(error);
        }
    });

    app.get("/api/carts/:cart_id", async (req, res, next) => {
        try {
            const userIdByToken = await findUserWithToken(
                req.headers.authorization
            );
            const userByCartId = await getUserId(req.params.cart_id);
            if (userIdByToken.id === userByCartId) {
                const cart_items = await fetchCartItems(req.params.cart_id);
                res.send({ cart_items });
            } else {
                res.sendStatus(401);
            }
        } catch (error) {
            next(error);
        }
    });

    app.post(
        "/api/carts/:cart_id/products/:product_id",
        async (req, res, next) => {
            try {
                const userIdByToken = await findUserWithToken(
                    req.headers.authorization
                );
                const userByCartId = await getUserId(req.params.cart_id);
                if (userIdByToken.id === userByCartId) {
                    await addProductToCart(
                        req.params.cart_id,
                        req.params.product_id,
                        req.body.quantity
                    );
                    res.sendStatus(201);
                } else {
                    res.sendStatus(401);
                }
            } catch (ex) {
                next(ex);
            }
        }
    );

    app.delete(
        "/api/carts/:cart_id/products/:product_id",
        async (req, res, next) => {
            try {
                const userIdByToken = await findUserWithToken(
                    req.headers.authorization
                );
                const userByCartId = await getUserId(req.params.cart_id);
                if (userIdByToken.id === userByCartId) {
                    const currentQuantity = await fetchCartItemQuantity(
                        req.params.cart_id,
                        req.params.product_id
                    );
                    await deleteCartItem(
                        req.params.cart_id,
                        req.params.product_id
                    );
                    await addToProductQuantity(
                        req.params.product_id,
                        currentQuantity
                    );
                    res.sendStatus(204);
                } else {
                    res.sendStatus(401);
                }
            } catch (error) {
                next(error);
            }
        }
    );

    app.delete("/api/carts/:cart_id/checkout", async (req, res, next) => {
        try {
            const userIdByToken = await findUserWithToken(
                req.headers.authorization
            );
            const cart_items = req.body.cart_items;
            const userByCartId = await getUserId(req.params.cart_id);
            if (userIdByToken.id === userByCartId) {
                cart_items.forEach(async (item) => {
                    await deleteCartItem(req.params.cart_id, item.product_id);
                });
                res.sendStatus(204);
            } else {
                res.sendStatus(401);
            }
        } catch (error) {
            next(error);
        }
    });
};
