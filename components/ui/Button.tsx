"use client";

import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  isLoading?: boolean;
}

export function Button({ variant = "primary", isLoading, children, ...props }: ButtonProps) {
  const baseStyles = "w-full py-2 rounded-md transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    danger: "text-red-600 hover:bg-red-50",
    ghost: "hover:bg-gray-200 text-gray-500 hover:text-gray-900"
  };

  return (
    <button 
      {...props} 
      className={`${baseStyles} ${variants[variant]} ${props.className}`}
      disabled={isLoading || props.disabled}
    >
      {isLoading && <Loader2 size={18} className="animate-spin" />}
      {children}
    </button>
  );
}