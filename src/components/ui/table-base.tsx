import React from "react"

interface TableBaseProps {
  children: React.ReactNode
  className?: string
}

export const TableBase: React.FC<TableBaseProps> = ({children, className = ""}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg ${className}`}>
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10"></div>
      <div className="relative overflow-x-auto rounded-xl">
        {children}
      </div>
    </div>
  )
}

export const TableHeader: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return (
    <thead>
    <tr className="bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white shadow-md">
      {children}
    </tr>
    </thead>
  )
}

export const TableHeaderCell: React.FC<{ children: React.ReactNode; className?: string }> = ({
                                                                                               children,
                                                                                               className = ""
                                                                                             }) => {
  return (
    <th className={`px-6 py-4 text-left font-medium text-sm tracking-wider uppercase ${className}`}>
      <div className="flex items-center gap-2">
        {children}
      </div>
    </th>
  )
}

export const TableBody: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return <tbody className="divide-y divide-gray-200/70 dark:divide-gray-700/70">{children}</tbody>
}

export const TableRow: React.FC<{ children: React.ReactNode; className?: string }> = ({
                                                                                        children,
                                                                                        className = ""
                                                                                      }) => {
  return (
    <tr className={`group transition-all duration-200 hover:bg-blue-50/80 dark:hover:bg-gray-700/50 ${className}`}>
      {children}
    </tr>
  )
}

export const TableCell: React.FC<{ children: React.ReactNode; className?: string }> = ({
                                                                                         children,
                                                                                         className = ""
                                                                                       }) => {
  return (
    <td className={`px-6 py-4 text-sm text-gray-700 dark:text-gray-300 ${className}`}>
      {children}
    </td>
  )
}

export const TableActionCell: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return (
    <td className="px-6 py-4 text-center">
      <div className="flex items-center justify-center gap-3">
        {children}
      </div>
    </td>
  )
}

export const StatusBadge: React.FC<{ status: string; className?: string }> = ({status, className = ""}) => {
  let statusClasses = ""

  switch (status.toLowerCase()) {
    case "success":
    case "confirmed":
    case "completed":
      statusClasses = "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      break
    case "pending":
      statusClasses = "bg-gradient-to-r from-amber-400 to-amber-500 text-white"
      break
    case "cancelled":
    case "failed":
      statusClasses = "bg-gradient-to-r from-red-500 to-rose-500 text-white"
      break
    default:
      statusClasses = "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
  }

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium shadow-sm ${statusClasses} ${className}`}>
      {status}
    </span>
  )
}

export const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "primary" | "danger" | "success" | "warning"
}> = ({
        icon,
        label,
        onClick,
        variant = "primary"
      }) => {
  const variantClasses = {
    primary: "text-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30",
    danger: "text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30",
    success: "text-green-500 hover:text-green-700 hover:bg-green-100 dark:hover:bg-green-900/30",
    warning: "text-amber-500 hover:text-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/30"
  }

  return (
    <button
      onClick={onClick}
      className={`group relative p-2 rounded-full transition-all duration-200 ${variantClasses[variant]}`}
      title={label}
    >
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
      <span className="relative z-10">{icon}</span>
      <span className="sr-only">{label}</span>
    </button>
  )
}

export const TableSkeleton: React.FC<{ columns: number; rows: number }> = ({columns, rows}) => {
  return (
    <div className="animate-pulse">
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-t-xl mb-2"></div>
      {Array.from({length: rows}).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2 mb-2">
          {Array.from({length: columns}).map((_, colIndex) => (
            <div key={colIndex} className="h-10 bg-gray-100 dark:bg-gray-800 rounded flex-1"></div>
          ))}
        </div>
      ))}
    </div>
  )
}
