import AdminLayout from "@/layout/Admin";
import PublicLayout from "@/layout/Public";
import AddCategory from "@/screens/AddCategory";
import AddProduct from "@/screens/AddProduct";
import CartScreen from "@/screens/CartScreen";
import CheckCategory from "@/screens/CheckCategory";
import CheckOrder from "@/screens/CheckOrder";
import CheckProduct from "@/screens/CheckProduct";
import Dashboard from "@/screens/Dashboard";
import EditProduct from "@/screens/EditProduct";
import Home from "@/screens/Home";
import NotFound from "@/screens/NotFound";
import Onboarding from "@/screens/Onboarding";
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
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          {/* order section */}
          <Route path="/admin/check-order" element={<CheckOrder />} />
          {/* category section */}
          <Route path="/admin/add-category" element={<AddCategory/>} />
          <Route path="/admin/check-category" element={<CheckCategory/>} />
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
