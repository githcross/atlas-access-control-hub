
import { Button } from "@/components/ui/button";
import { Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import SearchInput from "../ui/SearchInput";

const Header = () => {
  return (
    <header className="h-16 border-b bg-white dark:bg-card flex items-center px-6">
      <Link to="/" className="flex items-center mr-8">
        <h1 className="text-xl font-semibold bg-gradient-to-r from-atlas-indigo to-atlas-violet bg-clip-text text-transparent">
          Atlas Access Hub
        </h1>
      </Link>
      
      <div className="flex-1 hidden md:block max-w-md">
        <SearchInput placeholder="Search services, users, or domains..." />
      </div>
      
      <div className="ml-auto flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <Button variant="ghost" size="icon">
          <Settings size={20} />
        </Button>
        
        <div className="flex items-center ml-2">
          <div className="w-8 h-8 rounded-full bg-atlas-purple flex items-center justify-center text-white text-sm">
            JS
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
