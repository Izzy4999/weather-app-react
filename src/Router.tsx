import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import AddLocation from "./pages/AddLocation";
import LocationDetails from "./pages/LocationDetails";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="add" element={<AddLocation />} />
      <Route path="location/:id" element={<LocationDetails />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
