import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home";
import Products from "./pages/products";
import ProductDetail from "./pages/productDetail";
import Cart from "./pages/cart";
import LoginView from "./pages/auth/loginView";
import PublicLayout from "./layout/publicLayout";
import RegisterView from "./pages/auth/registerView";
import PublicRoute from "./guard/publicRoute";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <div className="flex-1">
          <Routes>
            {/* Public */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginView />} />
              <Route path="/register" element={<RegisterView />} />
            </Route>

            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />

              <Route path="/products" element={<Products />} />

              <Route path="/products/:id" element={<ProductDetail />} />

              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route
              path="*"
              element={
                <div className="flex min-h-[70vh] items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-6xl font-black">404</h1>
                    <p className="mt-3 text-muted-foreground">Page not found</p>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
