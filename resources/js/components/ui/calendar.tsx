import { ChevronLeft, ChevronRight } from "lucide-react";
import * as Primitive from "react-aria-components";
import { tv } from "tailwind-variants";
import { Button } from "./button";

const cellStyles = tv({
    base: "flex size-9 cursor-default items-center justify-center rounded-full text-sm outline-none focus:outline-none",
    variants: {
        isSelected: {
            false: "text-foreground hover:bg-accent/70",
            true: "bg-accent text-accent-foreground invalid:bg-danger invalid:text-danger-foreground",
        },
        isDisabled: {
            true: "text-muted-foreground",
        },
    },
});

interface CalendarProps<T extends Primitive.DateValue>
    extends Omit<Primitive.CalendarProps<T>, "visibleDuration"> {
    errorMessage?: string;
}

function Calendar<T extends Primitive.DateValue>({
    errorMessage,
    ...props
}: CalendarProps<T>) {
    return (
        <Primitive.Calendar {...props}>
            <CalendarHeader />
            <Primitive.CalendarGrid>
                <CalendarGridHeader />
                <Primitive.CalendarGridBody>
                    {(date) => (
                        <Primitive.CalendarCell
                            date={date}
                            className={cellStyles}
                        />
                    )}
                </Primitive.CalendarGridBody>
            </Primitive.CalendarGrid>
            {errorMessage && (
                <Primitive.Text
                    slot="errorMessage"
                    className="text-sm text-danger"
                >
                    {errorMessage}
                </Primitive.Text>
            )}
        </Primitive.Calendar>
    );
}

function CalendarHeader() {
    const { direction } = Primitive.useLocale();

    return (
        <header className="flex w-full items-center gap-1 px-1 pb-4">
            <Button
                size="icon"
                className="[&_[data-slot=icon]]:text-foreground"
                variant="outline"
                slot="previous"
            >
                {direction === "rtl" ? (
                    <ChevronRight aria-hidden />
                ) : (
                    <ChevronLeft aria-hidden />
                )}
            </Button>
            <Primitive.Heading className="mx-2 flex-1 text-center text-base font-medium text-foreground" />
            <Button
                size="icon"
                className="[&_[data-slot=icon]]:text-foreground"
                variant="outline"
                slot="next"
            >
                {direction === "rtl" ? (
                    <ChevronLeft aria-hidden />
                ) : (
                    <ChevronRight aria-hidden />
                )}
            </Button>
        </header>
    );
}

function CalendarGridHeader() {
    return (
        <Primitive.CalendarGridHeader>
            {(day) => (
                <Primitive.CalendarHeaderCell className="text-xs font-semibold text-muted-foreground">
                    {day}
                </Primitive.CalendarHeaderCell>
            )}
        </Primitive.CalendarGridHeader>
    );
}

interface RangeCalendarProps<T extends Primitive.DateValue>
    extends Omit<Primitive.RangeCalendarProps<T>, "visibleDuration"> {
    errorMessage?: string;
}

const cell = tv({
    base: "flex h-full w-full items-center justify-center rounded-full text-foreground",
    variants: {
        selectionState: {
            none: "group-hover:bg-accent/70 group-pressed:bg-accent/70",
            middle: [
                "group-hover:bg-accent/70",
                "group-invalid:group-hover:bg-danger/70",
                "group-pressed:bg-accent",
                "group-invalid:group-pressed:bg-danger",
            ],
            cap: "bg-accent text-accent-foreground group-invalid:bg-danger group-invalid:text-danger-foreground",
        },
        isDisabled: {
            true: "text-muted-foreground",
        },
    },
});

function RangeCalendar<T extends Primitive.DateValue>({
    errorMessage,
    ...props
}: RangeCalendarProps<T>) {
    return (
        <Primitive.RangeCalendar {...props}>
            <CalendarHeader />
            <Primitive.CalendarGrid className="[&_td]:px-0">
                <CalendarGridHeader />
                <Primitive.CalendarGridBody>
                    {(date) => (
                        <Primitive.CalendarCell
                            date={date}
                            className="group size-9 cursor-default text-sm outline outline-0 outside-month:text-secondary selected:bg-accent/70 invalid:selected:bg-danger/70 selection-start:rounded-s-full selection-end:rounded-e-full [td:first-child_&]:rounded-s-full [td:last-child_&]:rounded-e-full"
                        >
                            {({
                                formattedDate,
                                isSelected,
                                isSelectionStart,
                                isSelectionEnd,
                                isDisabled,
                            }) => (
                                <span
                                    className={cell({
                                        selectionState:
                                            isSelected &&
                                            (isSelectionStart || isSelectionEnd)
                                                ? "cap"
                                                : isSelected
                                                ? "middle"
                                                : "none",
                                        isDisabled,
                                    })}
                                >
                                    {formattedDate}
                                </span>
                            )}
                        </Primitive.CalendarCell>
                    )}
                </Primitive.CalendarGridBody>
            </Primitive.CalendarGrid>
            {errorMessage && (
                <Primitive.Text
                    slot="errorMessage"
                    className="text-sm text-danger"
                >
                    {errorMessage}
                </Primitive.Text>
            )}
        </Primitive.RangeCalendar>
    );
}

Calendar.GridHeader = CalendarGridHeader;
Calendar.Header = CalendarHeader;
Calendar.RangeCalendar = RangeCalendar;

export { Calendar };
