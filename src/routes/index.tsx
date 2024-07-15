import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "../pages/login/register";
import { Home } from "../pages/home";
import { Auth } from "../pages/auth";
import { PublicRoute } from "./publicRoute";
import { Login } from "../pages/login";
import Profile from "../pages/profile";
const AppRoutes = () => {

  return(
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        >
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile/>} />
        </Route>
        <Route path="home" element={<Home/>} /> 
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes }