import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="bg-[#353535] text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          onClick={closeMobileMenu}
        >
          <img
            src="/logo.png"
            alt="FlightOnTime Logo"
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
          />
          {/* <div className="flex items-center space-x-3">
            <div>
              <h2 className="text-base md:text-lg font-bold ">
                Flight on Time
              </h2>
              <p className="text-xs md:text-sm text-gray-300">
                Predição de Atrasos de Voos
              </p>
            </div>
          </div> */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`hover:text-blue-300 transition-colors ${
              isActive("/") ? "text-blue-400 font-semibold" : ""
            }`}
          >
            Início
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={`hover:text-blue-300 transition-colors ${
                  isActive("/dashboard") ? "text-blue-400 font-semibold" : ""
                }`}
              >
                Predição
              </Link>
              <Link
                to="/flights"
                className={`hover:text-blue-300 transition-colors ${
                  isActive("/flights") ? "text-blue-400 font-semibold" : ""
                }`}
              >
                Voos
              </Link>
              <Link
                to="/stats"
                className={`hover:text-blue-300 transition-colors ${
                  isActive("/stats") ? "text-blue-400 font-semibold" : ""
                }`}
              >
                Estatísticas
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white hover:text-red-300 hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`hover:text-blue-300 transition-colors ${
                  isActive("/login") ? "text-blue-400 font-semibold" : ""
                }`}
              >
                Login
              </Link>
              <Link to="/register">
                <Button variant="secondary" size="sm">
                  Cadastrar
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-blue-300 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#2a2a2a] border-t border-gray-600">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className={`hover:text-blue-300 transition-colors py-2 ${
                isActive("/") ? "text-blue-400 font-semibold" : ""
              }`}
              onClick={closeMobileMenu}
            >
              Início
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`hover:text-blue-300 transition-colors py-2 ${
                    isActive("/dashboard") ? "text-blue-400 font-semibold" : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/flights"
                  className={`hover:text-blue-300 transition-colors py-2 ${
                    isActive("/flights") ? "text-blue-400 font-semibold" : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  Voos
                </Link>
                <Link
                  to="/stats"
                  className={`hover:text-blue-300 transition-colors py-2 ${
                    isActive("/stats") ? "text-blue-400 font-semibold" : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  Estatísticas
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-white hover:text-red-300 hover:bg-red-900/20 justify-start"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`hover:text-blue-300 transition-colors py-2 ${
                    isActive("/login") ? "text-blue-400 font-semibold" : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link to="/register" onClick={closeMobileMenu}>
                  <Button variant="secondary" size="sm" className="w-full">
                    Cadastrar
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
