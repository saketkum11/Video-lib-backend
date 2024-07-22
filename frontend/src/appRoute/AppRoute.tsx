import { Routes, Route } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
const AppRoute = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
