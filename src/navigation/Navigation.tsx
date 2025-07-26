import AdminLayout from "@/layout/Admin";
import Dashboard from "@/screens/Dashboard";
import Onboarding from "@/screens/Onboarding";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route element={<AdminLayout/>}>
          <Route path="/admin" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
