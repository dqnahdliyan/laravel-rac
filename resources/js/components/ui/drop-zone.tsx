import * as Primitive from "react-aria-components";

import { cn } from "@/lib/utils";

const DropZone = ({ className, ...props }: Primitive.DropZoneProps) => (
    <Primitive.DropZone
        className={(values) =>
            cn(
                "flex h-[150px] w-[300px] flex-col items-center justify-center gap-2 rounded-md border border-dashed text-sm data-[drop-target]:border-solid data-[drop-target]:border-primary data-[drop-target]:bg-accent",
                typeof className === "function" ? className(values) : className
            )
        }
        {...props}
    />
);

export { DropZone };
