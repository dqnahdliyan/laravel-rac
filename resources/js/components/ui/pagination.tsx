import * as React from "react";

import type { LabelProps, LinkProps } from "react-aria-components";
import { Link } from "react-aria-components";
import type { VariantProps } from "tailwind-variants";

import { Label } from "./field";
import { cn } from "@/lib/utils";
import { Separator } from "./separator";
import { buttonVariants } from "./button";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    MoreHorizontal,
} from "lucide-react";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
    />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn(className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

interface PaginationLinkProps
    extends LinkProps,
        VariantProps<typeof buttonVariants> {
    isActive?: boolean;
    className?: string;
}

const PaginationLink = ({
    className,
    isActive,
    size = "icon",
    ...props
}: PaginationLinkProps) => (
    <Link
        aria-current={isActive ? "page" : undefined}
        className={cn(
            buttonVariants({
                variant: isActive ? "primary" : "outline",
                size,
                className: "rounded-lg",
            }),
            className,
        )}
        {...props}
    />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to previous page"
        size="icon"
        className={cn("gap-1", className)}
        {...props}
    >
        <ChevronLeftIcon />

        <span className="sr-only">Previous</span>
    </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to next page"
        size="icon"
        className={cn("gap-1", className)}
        {...props}
    >
        <span className="sr-only">Next</span>
        <ChevronRightIcon />
    </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationLast = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to next page"
        size="icon"
        className={cn("gap-1", className)}
        {...props}
    >
        <span className="sr-only">Last</span>
        <ChevronsRightIcon />
    </PaginationLink>
);
PaginationLast.displayName = "PaginationLast";

const PaginationFirst = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to previous page"
        size="icon"
        className={cn("gap-1", className)}
        {...props}
    >
        <ChevronsLeftIcon />

        <span className="sr-only">First</span>
    </PaginationLink>
);
PaginationFirst.displayName = "PaginationFirst";

const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <span
        aria-hidden
        className={cn("flex size-9 items-center justify-center", className)}
        {...props}
    >
        <MoreHorizontal className="size-4" />
        <span className="sr-only">More pages</span>
    </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

const PaginationLabel = ({ className, ...props }: LabelProps) => (
    <Label
        aria-hidden
        className={cn(
            "grid h-9 place-content-center px-3 text-sm font-normal",
            className,
        )}
        {...props}
    />
);
PaginationLabel.displayName = "PaginationLabel";

const PaginationSeparator = ({
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <Separator
        aria-hidden
        className={cn("mx-1 h-5 w-px rotate-[14deg] self-center", className)}
        {...props}
    ></Separator>
);
PaginationSeparator.displayName = "PaginationSeparator";

Pagination.Content = PaginationContent;
Pagination.Ellipsis = PaginationEllipsis;
Pagination.First = PaginationFirst;
Pagination.Item = PaginationItem;
Pagination.Label = PaginationLabel;
Pagination.Last = PaginationLast;
Pagination.Link = PaginationLink;
Pagination.Next = PaginationNext;
Pagination.Previous = PaginationPrevious;
Pagination.Separator = PaginationSeparator;

export { Pagination };
