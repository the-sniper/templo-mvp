import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          {/* Decorative Icon */}
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <span className="text-5xl">🙏</span>
          </div>
          
          <h1 className="mb-3 font-serif text-4xl sm:text-5xl font-bold text-foreground">
            404
          </h1>
          
          <h2 className="mb-4 font-serif text-xl sm:text-2xl font-semibold text-foreground">
            Page Not Found
          </h2>
          
          <p className="mb-8 text-muted-foreground text-base sm:text-lg leading-relaxed">
            The path you seek does not exist. Perhaps the temple you're looking for awaits on another route.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto rounded-full px-8 gap-2">
                <Home className="h-4 w-4" />
                Return Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto rounded-full px-8 gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
