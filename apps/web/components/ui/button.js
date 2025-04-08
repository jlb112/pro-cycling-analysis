import React from "react"
import Link from "next/link"

const buttonVariants = {
  default:
    "inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90",
  outline:
    "inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50",
  ghost:
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-gray-800 dark:hover:text-gray-50",
}

const sizeVariants = {
  default: "h-10",
  sm: "h-9 px-3",
  lg: "h-11 px-8",
  icon: "h-10 w-10 p-0",
}

export function Button({ className = "", variant = "default", size = "default", asChild = false, children, ...props }) {
  const Comp = asChild ? Slot : "button"
  const buttonClasses = `${buttonVariants[variant] || buttonVariants.default} ${sizeVariants[size] || sizeVariants.default} ${className}`

  // If it's a link (has href), use Next.js Link
  if (props.href && !asChild) {
    return (
      <Link href={props.href} className={buttonClasses} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}

// Simple Slot implementation for asChild functionality
function Slot({ children, ...props }) {
  const child = React.Children.only(children)
  return React.cloneElement(child, { ...props })
}

export { Button as default }
