
import React from "react"

export function MobileOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-4 max-w-md">
        <h2 className="text-2xl font-bold">Desktop Only</h2>
        <p className="text-lg">
          This tool is not yet optimized for mobile. Check it out on a desktop when you get a chance!
        </p>
        <div className="text-muted-foreground pt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto opacity-50"
          >
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
          </svg>
        </div>
      </div>
    </div>
  )
}
