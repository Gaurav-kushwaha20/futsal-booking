import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    className,
    ...props
}) => {
    const baseStyles =
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const sizeStyles: Record<ButtonSize, string> = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    const variantStyles: Record<ButtonVariant, string> = {
        primary:
            "bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)] focus:ring-[var(--color-primary-500)]",
        secondary:
            "bg-[var(--color-secondary-500)] text-white hover:bg-[var(--color-secondary-600)] focus:ring-[var(--color-secondary-400)]",
        outline:
            "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
        ghost:
            "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
        danger:
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    return (
        <button
            className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
