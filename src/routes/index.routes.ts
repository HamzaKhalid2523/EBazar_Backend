// Requiring Routes
export default function routesIndex(app: any) {
    const AdminRoutes = require("./admin.routes");
    const SellerRoutes = require("./seller.routes");
    const UsersRoutes = require("./users.routes");
    const OriginalShopsRoutes = require("./originalShops.routes");
    const LocalShopsRoutes = require("./localShops.routes");
    const MartShopsRoutes = require("./martShops.routes");
    const MartProducts = require("./martProducts.routes");
    const LocalProducts = require("./localProducts.routes");
    const CartProducts = require("./cart.routes");
    const AddressProducts = require("./address.routes");
    const OrderRoutes = require("./order.routes");
    const OrderItemRoutes = require("./orderItem.routes");
    const RatingsRoutes = require("./ratings.routes");
    
    app.use("/api/admins", AdminRoutes);
    app.use("/api/sellers", SellerRoutes);
    app.use("/api/users", UsersRoutes);
    app.use("/api/originalShops", OriginalShopsRoutes);
    app.use("/api/localShops", LocalShopsRoutes);
    app.use("/api/martShops", MartShopsRoutes);
    app.use("/api/martProducts", MartProducts);
    app.use("/api/localProducts", LocalProducts);
    app.use("/api/cart", CartProducts);
    app.use("/api/address", AddressProducts);
    app.use("/api/order", OrderRoutes);
    app.use("/api/orderItem", OrderItemRoutes);
    app.use("/api/ratings", RatingsRoutes);
}
