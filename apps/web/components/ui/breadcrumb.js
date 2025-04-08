export function Breadcrumb({ className = "", ...props }) {
    return <nav className={`flex ${className}`} aria-label="Breadcrumb" {...props} />
  }
  
  export function BreadcrumbList({ className = "", ...props }) {
    return <ol className={`flex items-center space-x-2 ${className}`} {...props} />
  }
  
  export function BreadcrumbItem({ className = "", ...props }) {
    return <li className={`flex items-center ${className}`} {...props} />
  }
  
  export function BreadcrumbLink({ className = "", href = "#", ...props }) {
    return (
      <a
        href={href}
        className={`text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${className}`}
        {...props}
      />
    )
  }
  
  export function BreadcrumbPage({ className = "", ...props }) {
    return <span className={`text-sm font-medium text-gray-900 dark:text-gray-50 ${className}`} {...props} />
  }
  
  export function BreadcrumbSeparator({ className = "", ...props }) {
    return (
      <span className={`text-gray-400 ${className}`} {...props}>
        /
      </span>
    )
  }
  