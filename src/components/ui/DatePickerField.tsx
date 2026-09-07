import React, { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

type DatePickerFieldProps = {
  label: string;
  startValue: string;
  endValue: string;
  onChange: (value: { start: string; end: string }) => void;
  placeholder: string;
  minDate?: string;
  unavailablePeriods?: { dateFrom?: string; dateTo?: string }[];
};

type CalendarDay = {
  date: Date;
  key: string;
  inCurrentMonth: boolean;
  available: boolean;
  inRange: boolean;
  rangeStart: boolean;
  rangeEnd: boolean;
  today: boolean;
};

const weekdayLabels = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(value: string) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBeforeDay(a: Date, b: Date) {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

function isDateInRange(date: Date, from?: string, to?: string) {
  if (!from || !to) {
    return false;
  }

  const fromDate = parseDateKey(from);
  const toDate = parseDateKey(to);

  if (!fromDate || !toDate) {
    return false;
  }

  const target = startOfDay(date).getTime();
  const start = startOfDay(fromDate).getTime();
  const end = startOfDay(toDate).getTime();

  return target >= start && target <= end;
}

function isDateRangeBlocked(
  fromKey: string,
  toKey: string,
  unavailablePeriods?: { dateFrom?: string; dateTo?: string }[],
) {
  const fromDate = parseDateKey(fromKey);
  const toDate = parseDateKey(toKey);

  if (!fromDate || !toDate) {
    return true;
  }

  const start = startOfDay(fromDate).getTime();
  const end = startOfDay(toDate).getTime();

  if (end < start) {
    return true;
  }

  const blockedPeriods = unavailablePeriods ?? [];

  for (const period of blockedPeriods) {
    const periodStart = parseDateKey(period.dateFrom ?? "");
    const periodEnd = parseDateKey(period.dateTo ?? "");

    if (!periodStart || !periodEnd) {
      continue;
    }

    const periodStartTime = startOfDay(periodStart).getTime();
    const periodEndTime = startOfDay(periodEnd).getTime();
    const overlaps = start <= periodEndTime && end >= periodStartTime;

    if (overlaps) {
      return true;
    }
  }

  return false;
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function formatDateLabel(date: Date) {
  return new Intl.DateTimeFormat("nl-BE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function buildCalendarDays(
  monthDate: Date,
  startValue: string,
  endValue: string,
  minDate?: string,
  unavailablePeriods?: { dateFrom?: string; dateTo?: string }[],
) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7;
  const gridStart = new Date(year, month, 1 - startOffset);
  const today = startOfDay(new Date());
  const startSelected = parseDateKey(startValue);
  const endSelected = parseDateKey(endValue);
  const minimum = parseDateKey(minDate ?? "");

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);

    const available =
      !isBeforeDay(date, today) &&
      (!minimum || !isBeforeDay(date, minimum)) &&
      !(unavailablePeriods ?? []).some((period) =>
        isDateInRange(date, period.dateFrom, period.dateTo),
      );

    const inRange =
      !!startSelected &&
      !!endSelected &&
      startOfDay(date).getTime() >= startOfDay(startSelected).getTime() &&
      startOfDay(date).getTime() <= startOfDay(endSelected).getTime();

    return {
      date,
      key: toDateKey(date),
      inCurrentMonth: date.getMonth() === month,
      available,
      inRange,
      rangeStart: startSelected ? isSameDay(date, startSelected) : false,
      rangeEnd: endSelected ? isSameDay(date, endSelected) : false,
      today: isSameDay(date, today),
    } as CalendarDay;
  });
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  startValue,
  endValue,
  onChange,
  placeholder,
  minDate,
  unavailablePeriods,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selectionStart, setSelectionStart] = useState<string>("");
  const [monthCursor, setMonthCursor] = useState(() => {
    return parseDateKey(startValue || endValue) ?? new Date();
  });

  const closePopup = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        closePopup();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const days = useMemo(
    () =>
      buildCalendarDays(
        monthCursor,
        startValue,
        endValue,
        minDate,
        unavailablePeriods,
      ),
    [monthCursor, startValue, endValue, minDate, unavailablePeriods],
  );

  const monthLabel = new Intl.DateTimeFormat("nl-BE", {
    month: "long",
    year: "numeric",
  }).format(monthCursor);

  const selectedStartDate = parseDateKey(startValue);
  const selectedEndDate = parseDateKey(endValue);
  const displayValue =
    selectedStartDate && selectedEndDate
      ? `${formatDateLabel(selectedStartDate)} - ${formatDateLabel(selectedEndDate)}`
      : selectedStartDate
        ? `${formatDateLabel(selectedStartDate)} - Uitcheckdatum kiezen`
        : placeholder;

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>

      <button
        type="button"
        onClick={() => {
          if (open) {
            closePopup();
            return;
          }

          setOpen(true);
        }}
        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-left text-sm text-gray-700 flex items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm hover:border-primary/30"
      >
        <span
          className={
            selectedStartDate || selectedEndDate
              ? "text-gray-800"
              : "text-gray-400"
          }
        >
          {displayValue}
        </span>
        <Calendar className="w-4 h-4 text-primary shrink-0" />
      </button>

      {open && (
        <div
          key="open"
          className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-30 rounded-3xl border border-[#e8e1d6] bg-[#fffdf8] shadow-[0_24px_60px_rgba(17,24,39,0.16)] p-4 sm:p-5 animate-drop-in will-change-transform"
        >
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() =>
                setMonthCursor((current) => addMonths(current, -1))
              }
              className="h-10 w-10 rounded-full border border-[#e8e1d6] bg-white text-foreground flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
              aria-label="Vorige maand"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="text-sm sm:text-base font-semibold text-foreground capitalize">
              {monthLabel}
            </div>

            <button
              type="button"
              onClick={() => setMonthCursor((current) => addMonths(current, 1))}
              className="h-10 w-10 rounded-full border border-[#e8e1d6] bg-white text-foreground flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
              aria-label="Volgende maand"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              Geselecteerd
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#9bb87b]" />
              Beschikbaar
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
              Niet beschikbaar
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500 mb-2">
            {weekdayLabels.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => {
              const baseClasses =
                "h-11 rounded-2xl text-sm font-medium transition-all flex items-center justify-center";

              if (!day.available) {
                return (
                  <div
                    key={day.key}
                    className={`${baseClasses} bg-gray-100 text-gray-300 ${day.inCurrentMonth ? "" : "opacity-50"}`}
                    aria-hidden="true"
                  >
                    {day.date.getDate()}
                  </div>
                );
              }

              const isSelected = day.rangeStart || day.rangeEnd;

              return (
                <button
                  key={day.key}
                  type="button"
                  onClick={() => {
                    if (!selectionStart) {
                      setSelectionStart(day.key);
                      onChange({ start: day.key, end: "" });
                      return;
                    }

                    if (
                      isDateRangeBlocked(
                        selectionStart,
                        day.key,
                        unavailablePeriods,
                      ) ||
                      day.key < selectionStart
                    ) {
                      setSelectionStart(day.key);
                      onChange({ start: day.key, end: "" });
                      return;
                    }

                    onChange({ start: selectionStart, end: day.key });
                    setSelectionStart("");
                  }}
                  className={`${baseClasses} ${
                    isSelected
                      ? "bg-primary text-white shadow-md"
                      : day.inRange
                        ? "bg-[#d8edce] text-foreground hover:bg-[#d8edce]/80"
                        : "bg-[#f2f6ee] text-foreground hover:bg-[#d8edce]/80"
                  } ${day.today && !isSelected ? "ring-1 ring-primary/30" : ""} ${
                    day.inCurrentMonth ? "" : "opacity-65"
                  }`}
                  aria-label={formatDateLabel(day.date)}
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
