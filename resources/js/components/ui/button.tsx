import { cn } from "@/lib/utils";
import * as React from "react";
import * as ButtonPrimitive from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
    base: "inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium transition focus:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
    variants: {
        variant: {
            primary:
                "bg-primary text-primary-foreground shadow-sm hover:bg-primary/80 pressed:bg-primary/90 pressed:ring pressed:ring-primary/40",
            secondary:
                "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 pressed:bg-secondary/90 pressed:ring pressed:ring-secondary/40",
            danger: "bg-danger text-danger-foreground shadow-sm hover:bg-danger/80 pressed:bg-danger/90 pressed:ring pressed:ring-danger/40",
            success:
                "bg-success text-success-foreground shadow-sm hover:bg-success/80 pressed:bg-success/90 pressed:ring pressed:ring-success/40",
            info: "bg-info text-info-foreground shadow-sm hover:bg-info/80 pressed:bg-info/90 pressed:ring pressed:ring-info/40",
            warning:
                "bg-warning text-warning-foreground shadow-sm hover:bg-warning/80 pressed:bg-warning/90 pressed:ring pressed:ring-warning/40",
            dark: "bg-dark text-dark-foreground shadow-sm hover:bg-dark/80 pressed:bg-dark/90 pressed:ring pressed:ring-dark/40",
            outline:
                "border bg-transparent text-foreground shadow-sm hover:bg-foreground/5 pressed:bg-foreground/10",
            ghost: "text-foreground hover:bg-foreground/5 pressed:bg-foreground/10",
        },
        size: {
            md: "h-10 px-4 py-2",
            sm: "h-9 px-3",
            lg: "h-11 px-8",
            icon: "h-10 w-10",
        },
        shape: {
            square: "rounded-md",
            circle: "rounded-full",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
        shape: "square",
    },
});

export interface ButtonProps
    extends ButtonPrimitive.ButtonProps,
        VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, shape, ...props }, ref) => {
        return (
            <ButtonPrimitive.Button
                className={(values) =>
                    cn(
                        buttonVariants({
                            variant,
                            size,
                            shape,
                            className:
                                typeof className === "function"
                                    ? className(values)
                                    : className,
                        })
                    )
                }
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
