
import { FiChevronRight } from "react-icons/fi";
import { ReactNode } from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
 
}

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  backgroundColor: string;
  breadcrumbs?: BreadcrumbItem[];
}


export default function PageHeader({
  title,
  description,
  icon,
  backgroundColor,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <div className="w-full py-10 px-8" style={{ background: backgroundColor }}>
      {/* Breadcrumb */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex items-center gap-1 text-sm mb-4 text-white/60">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <span key={index} className="flex items-center gap-1">
                {isLast ? (
                  <span className="text-white font-medium">{item.label}</span>
                ) : (
                  <>
                    <span
                      className="hover:text-white cursor-pointer transition-colors"
                    >
                      {item.href ? (
                        <Link href={item.href}>{item.label}</Link>
                      ) : (
                        item.label
                      )}
                    </span>
                    /
                  </>
                )}
              </span>
            );
          })}
        </div>
      )}

      {/* Title Row */}
      <div className="flex items-center gap-4">
        {icon && (
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-white text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-white/70 text-sm mt-0.5">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}