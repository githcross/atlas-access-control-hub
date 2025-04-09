
import { cn } from "@/lib/utils";
import { ServiceType } from "@/data/mockData";

interface BadgeProps {
  type: ServiceType | string;
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
}

const getBadgeColor = (type: ServiceType | string) => {
  switch (type) {
    case 'hosting':
      return 'bg-service-hosting/10 text-service-hosting border-service-hosting/20';
    case 'domain':
      return 'bg-service-domain/10 text-service-domain border-service-domain/20';
    case 'repository':
      return 'bg-service-repository/10 text-service-repository border-service-repository/20';
    case 'email':
      return 'bg-service-email/10 text-service-email border-service-email/20';
    default:
      return 'bg-service-other/10 text-service-other border-service-other/20';
  }
};

const Badge = ({ type, size = "md", className = "", children }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-medium",
        getBadgeColor(type),
        size === "sm" ? "text-[10px] px-2 py-0.5" : "",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
