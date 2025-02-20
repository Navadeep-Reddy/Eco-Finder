import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../../client/src/pages/Home"
import Product from "./pages/Product";
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/login"
        element={<Product / >}
      />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
