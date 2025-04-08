import React from "react"

export function Sidebar({ children, className = "", ...props }) {
  return (
    <div className={`flex h-screen ${className}`} {...props}>
      {children}
    </div>
  )
}

export function SidebarHeader({ children, className = "", ...props }) {
  return (
    <div className={`p-4 border-b ${className}`} {...props}>
      {children}
    </div>
  )
}

export function SidebarContent({ children, className = "", ...props }) {
  return (
    <div className={`flex-1 overflow-auto p-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function SidebarGroup({ children, className = "", ...props }) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function SidebarGroupLabel({ children, className = "", ...props }) {
  return (
    <h3 className={`text-sm font-medium mb-2 ${className}`} {...props}>
      {children}
    </h3>
  )
}

export function SidebarGroupContent({ children, className = "", ...props }) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  )
}

export function SidebarMenu({ children, className = "", ...props }) {
  return (
    <ul className={`space-y-1 ${className}`} {...props}>
      {children}
    </ul>
  )
}

export function SidebarMenuItem({ children, className = "", ...props }) {
  return (
    <li className={`${className}`} {...props}>
      {children}
    </li>
  )
}

export function SidebarMenuButton({ children, isActive = false, asChild = false, className = "", ...props }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={`flex w-full items-center rounded-md px-3 py-2 text-sm ${
        isActive
          ? "bg-gray-100 font-medium text-gray-900 dark:bg-gray-800 dark:text-gray-50"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
      } ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
}

export function SidebarRail({ className = "", ...props }) {
  return <div className={`absolute inset-y-0 right-0 w-1 bg-gray-200 dark:bg-gray-800 ${className}`} {...props} />
}

export function SidebarInset({ children, className = "", ...props }) {
  return (
    <div className={`ml-64 flex flex-1 flex-col ${className}`} {...props}>
      {children}
    </div>
  )
}

export function SidebarProvider({ children }) {
  return <div className="relative flex">{children}</div>
}

export function SidebarTrigger({ className = "", ...props }) {
  return (
    <button
      className={`flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:text-gray-50 ${className}`}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
      <span className="sr-only">Toggle Menu</span>
    </button>
  )
}

// Simple Slot implementation for asChild functionality
function Slot({ children, ...props }) {
  const child = React.Children.only(children)
  return React.cloneElement(child, { ...props })
}
