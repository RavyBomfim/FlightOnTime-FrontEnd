import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await apiService.login({ email, password });
      login(response.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError("");
    setLoading(true);

    try {
      if (!credentialResponse.credential) {
        throw new Error("Credencial do Google não recebida");
      }

      const response = await apiService.googleLogin(
        credentialResponse.credential
      );
      login(response.token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao fazer login com Google"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Erro ao fazer login com Google");
  };

  return (
    <div className="h-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm border-none">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-semibold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signin_with"
                width="340"
                theme="filled_blue"
              />
            </div>
            <div className="flex justify-center items-center gap-2 opacity-60">
              <hr className="w-full" /> ou <hr className="w-full" />
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className="bg-background border-none"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="bg-background border-none"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Registre-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
