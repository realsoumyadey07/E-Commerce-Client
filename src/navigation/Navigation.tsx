import Onboarding from "@/screens/Onboarding";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  );
}
