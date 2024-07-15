import { Routes, Route } from "react-router-dom";
import { Home } from "../services";
const AppRoute = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
};

export default AppRoute;
