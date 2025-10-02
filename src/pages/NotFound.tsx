import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background pt-16">
      <div className="text-center px-4 animate-fade-in">
        <h1 className="mb-4 text-8xl font-bold text-primary">404</h1>
        <p className="mb-2 text-2xl font-semibold">Página Não Encontrada</p>
        <p className="mb-8 text-muted-foreground max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="fabric-button-primary inline-flex items-center justify-center gap-2">
            <Home size={18} />
            Voltar ao Início
          </Link>
          <button onClick={() => window.history.back()} className="fabric-button-secondary inline-flex items-center justify-center gap-2">
            <ArrowLeft size={18} />
            Página Anterior
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
