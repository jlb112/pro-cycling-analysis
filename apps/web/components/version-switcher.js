"use client"

import { useState } from "react"

export function VersionSwitcher({ versions = [], defaultVersion = "", className = "", ...props }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState(defaultVersion || (versions.length > 0 ? versions[0] : ""))

  return (
    <div className={`relative ${className}`} {...props}>
      <button
        type="button"
        className="flex h-9 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus:ring-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedVersion}</span>
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
          className="h-4 w-4 opacity-50"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-md dark:border-gray-800 dark:bg-gray-950">
          <div className="p-1">
            {versions.map((version) => (
              <button
                key={version}
                className={`flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  version === selectedVersion ? "bg-gray-100 font-medium dark:bg-gray-800" : ""
                }`}
                onClick={() => {
                  setSelectedVersion(version)
                  setIsOpen(false)
                }}
              >
                {version}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
