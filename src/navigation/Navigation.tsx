import AdminLayout from "@/layout/Admin";
import PublicLayout from "@/layout/Public";
import CartScreen from "@/screens/CartScreen";
import CheckOrder from "@/screens/CheckOrder";
import Dashboard from "@/screens/Dashboard";
import Home from "@/screens/Home";
import Onboarding from "@/screens/Onboarding";
import ProductDetails from "@/screens/ProductDetails";
import SearchScreen from "@/screens/SearchScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authentication" element={<Onboarding />} />
        <Route element={<PublicLayout />} >
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<CartScreen/>} />
          <Route path="/search" element={<SearchScreen/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route
            path="/admin"
            element={<Dashboard />}
          />
          <Route path="/admin/check-order" element={<CheckOrder/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
