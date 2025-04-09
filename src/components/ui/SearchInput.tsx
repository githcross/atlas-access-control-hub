
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
}

const SearchInput = ({ placeholder = "Search...", className = "" }: SearchInputProps) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-10 bg-muted/50 border-none"
      />
    </div>
  );
};

export default SearchInput;
