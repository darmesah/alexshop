import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import ProductPage from "./pages/Product";
import CartPage from "./pages/Cart";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/Profile";
import ShippingPage from "./pages/Shipping";
import PaymentPage from "./pages/Payment";
import PlaceOrderPage from "./pages/PlaceOrder";
import OrderPage from "./pages/Order";
import UserListPage from "./pages/UserList";
import UserEditPage from "./pages/UserEdit";
import ProductListPage from "./pages/ProductList";
import ProductEditPage from "./pages/ProductEdit";
import OrderListPage from "./pages/OrderList";

const App = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "",
          element: <RootLayout />,
          // errorElement: "",
          children: [
            { index: true, element: <HomePage /> },
            { path: "product/:id", element: <ProductPage /> },
            { path: "cart", element: <CartPage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "shipping", element: <ShippingPage /> },
            { path: "payment", element: <PaymentPage /> },
            { path: "placeorder", element: <PlaceOrderPage /> },
            { path: "order/:id", element: <OrderPage /> },
            { path: "admin/userlist", element: <UserListPage /> },
            { path: "admin/user/:id/edit", element: <UserEditPage /> },
            { path: "admin/productlist", element: <ProductListPage /> },
            { path: "admin/product/:id/edit", element: <ProductEditPage /> },
            { path: "admin/orderlist", element: <OrderListPage /> },
            { path: "search/:keyword", element: <HomePage /> },
            { path: "page/:pageNumber", element: <HomePage /> },
            { path: "search/:keyword/page/:pageNumber", element: <HomePage /> },
            {
              path: "admin/productlist/page/:pageNumber",
              element: <ProductListPage />,
            },
          ],
        },
      ])}
    />
  );
};

export default App;
