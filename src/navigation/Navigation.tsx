import AdminLayout from "@/layout/Admin";
import PublicLayout from "@/layout/Public";
import AddCategory from "@/screens/AddCategory";
import AddProduct from "@/screens/AddProduct";
import CartScreen from "@/screens/CartScreen";
import CategoryDetails from "@/screens/CategoryDetails";
import CheckCategory from "@/screens/CheckCategory";
import CheckOrder from "@/screens/CheckOrder";
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
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authentication" element={<Onboarding />} />
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/orders" element={<OrderScreen/>} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          {/* order section */}
          <Route path="/admin/check-order" element={<CheckOrder />} />
          {/* category section */}
          <Route path="/admin/add-category" element={<AddCategory/>} />
          <Route path="/admin/check-category" element={<CheckCategory/>} />
          <Route path="/admin/category-details/:id" element={<CategoryDetails/>} />
          <Route path="/admin/edit-category/:id" element={<EditCategory/>} />
          {/* product section */}
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/check-product" element={<CheckProduct />} />
          <Route path="/admin/product-details/:id" element={<ProductDetails />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
