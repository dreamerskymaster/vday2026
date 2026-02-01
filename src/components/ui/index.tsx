import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'outline' }
>(({ className, variant = 'primary', ...props }, ref) => {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-md",
    secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-md",
    ghost: "bg-transparent hover:bg-black/5 text-charcoal",
    outline: "border-2 border-primary text-primary hover:bg-primary/5",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-xl border-2 border-accent bg-white px-4 py-2 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-primary transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export const Card = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn("bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20", className)}>
    {children}
  </div>
);
