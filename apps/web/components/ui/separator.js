export function Separator({ orientation = "horizontal", className = "", ...props }) {
    return (
      <div
        className={`${
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]"
        } bg-gray-200 dark:bg-gray-800 ${className}`}
        {...props}
      />
    )
  }
  