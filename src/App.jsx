import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import DashboardPage from "./pages/admin/dashboard";
import ExperiencesPage from "./pages/admin/experiences";
import SkillsPage from "./pages/admin/skills";
import PortfolioPage from "./pages/admin/portfolio";
import UsersPage from "./pages/admin/users";
import HomePage from "./pages/public/home";
import LoginRegisterPage from "./pages/public/login-register";
import NotFoundPage from "./pages/public/notFound";
import { useSelector } from "react-redux";
import { authName } from "./redux/slices/auth";

function App() {
  const { isAuth, user } = useSelector((state) => state[authName]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="loginRegister" element={<LoginRegisterPage />} />

        <Route
          element={
            isAuth && user?.role === "admin" ? (
              <AdminLayout />
            ) : (
              <Navigate
                to={
                  (isAuth && user?.role === "user") || user?.role === "client"
                    ? "/"
                    : "/loginRegister"
                }
              />
            )
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="experiences" element={<ExperiencesPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;