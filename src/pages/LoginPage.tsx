
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

interface LocationState {
  from?: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState("hcruz@ufgcorp.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const state = location.state as LocationState;
  const from = state?.from || "/";
  
  // If already authenticated, redirect to the desired location
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(email, password);
    
    if (success) {
      navigate(from, { replace: true });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white dark:bg-card">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-atlas-indigo to-atlas-violet bg-clip-text text-transparent mb-2">
            Atlas Access Hub
          </h1>
          <p className="text-muted-foreground">Sign in to access your services</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <a href="#forgot" className="text-xs text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-flex items-center">
                <span className="animate-spin h-4 w-4 border-2 border-b-transparent rounded-full mr-2"></span>
                Signing in...
              </span>
            ) : "Sign In"}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            For demo purposes, use:
            <br />
            Email: hcruz@ufgcorp.com
            <br />
            Password: test
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
