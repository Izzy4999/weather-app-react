import React, { forwardRef } from "react";
import { cn } from "../utils/tailwindMerge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, rightIcon, className, ...props }, ref) => {
    return (
      <div className="bg-gray-200 w-full py-2 flex items-center px-3 rounded-md">
        {leftIcon && leftIcon}
        <input
          ref={ref}
          className={cn("flex-1 px-4 outline-none focus:ring-0", className)}
          {...props}
        />
        {rightIcon && rightIcon}
      </div>
    );
  }
);

export default Input;
