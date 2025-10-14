import AdminLayout from "@/layout/Admin";
import PublicLayout from "@/layout/Public";
import AddCategory from "@/screens/AddCategory";
import AddProduct from "@/screens/AddProduct";
import AdminOrderDetails from "@/screens/AdminOrderDetails";
import AdminProductDetails from "@/screens/AdminProductDetails";
import AdminUserScreen from "@/screens/AdminUserScreen";
import CartScreen from "@/screens/CartScreen";
import CategoryDetails from "@/screens/CategoryDetails";
import CategorySpecificScreen from "@/screens/CategorySpecificScreen";
import CheckCategory from "@/screens/CheckCategory";
import CheckOrder from "@/screens/CheckOrder";
import CheckoutScreen from "@/screens/CheckoutScreen";
import CheckProduct from "@/screens/CheckProduct";
import Dashboard from "@/screens/Dashboard";
import EditCategory from "@/screens/EditCategory";
import EditProduct from "@/screens/EditProduct";
import Home from "@/screens/Home";
import NotFound from "@/screens/NotFound";
import Onboarding from "@/screens/Onboarding";
import OrderScreen from "@/screens/OrderScreen";
import ProductDetails from "@/screens/ProductDetails";
import SearchScreen from "@/screens/SearchScreen";
import UserScreen from "@/screens/UserScreen";
import WishlistScreen from "@/screens/WishlistScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authentication" element={<Onboarding />} />
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/wishlist" element={<WishlistScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/orders" element={<OrderScreen />} />
          <Route path="/user" element={<UserScreen />} />
          <Route path="/checkout/:id" element={<CheckoutScreen />} />

          <Route
            path="/:category/products"
            element={<CategorySpecificScreen />}
          />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          {/* admin user */}
          <Route path="/get-user/:id" element={<AdminUserScreen />} />

          {/* order section */}
          <Route path="/admin/check-order" element={<CheckOrder />} />
          <Route
            path="/admin/order-details/:id"
            element={<AdminOrderDetails />}
          />
          {/* category section */}
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path="/admin/check-category" element={<CheckCategory />} />
          <Route
            path="/admin/category-details/:id"
            element={<CategoryDetails />}
          />
          <Route path="/admin/edit-category/:id" element={<EditCategory />} />
          {/* product section */}
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/check-product" element={<CheckProduct />} />
          <Route
            path="/admin/product-details/:id"
            element={<AdminProductDetails />}
          />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
