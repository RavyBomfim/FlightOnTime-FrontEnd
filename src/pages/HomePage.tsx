import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handlePreverAgora = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8">
            Flight On Time
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Quer prever se o seu voo vai atrasar?
          </p>

          {/* Plane Image */}
          <div className="mb-12 flex justify-center">
            <img
              src="/logo.png"
              alt="Avião"
              className="w-80 md:w-96 object-contain"
            />
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handlePreverAgora}
          size="lg"
          className="bg-transparent border-2 border-primary text-primary bg-primary text-white text-lg px-8 py-6 transition-all duration-300 cursor-pointer"
        >
          Prever Agora
        </Button>
      </div>
    </div>
  );
}
