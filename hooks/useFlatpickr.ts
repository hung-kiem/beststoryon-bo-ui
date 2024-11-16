import flatpickr from "flatpickr";
import { useEffect } from "react";
import moment from "moment";

type DatePickerProps = {
  onDateChange?: (date: string) => void;
  value?: string; // DD/MM/YYYY
  minDate?: string; // DD/MM/YYYY
  maxDate?: string; // DD/MM/YYYY
};

const useFlatpickr = (
  inputRef: React.RefObject<HTMLInputElement>,
  { onDateChange, value, minDate, maxDate }: DatePickerProps
) => {
  useEffect(() => {
    if (inputRef.current) {
      const parsedMinDate = minDate
        ? moment(minDate, "DD/MM/YYYY").toDate()
        : undefined;
      const parsedMaxDate = maxDate
        ? moment(maxDate, "DD/MM/YYYY").toDate()
        : undefined;
      const parsedValue = value
        ? moment(value, "DD/MM/YYYY").toDate()
        : undefined;

      const fp = flatpickr(inputRef.current, {
        mode: "single",
        static: true,
        monthSelectorType: "static",
        dateFormat: "d/m/Y",
        prevArrow:
          '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
        nextArrow:
          '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        minDate: parsedMinDate,
        maxDate: parsedMaxDate,
        defaultDate: parsedValue,
        onChange: (selectedDates) => {
          if (onDateChange) {
            const date = moment(selectedDates[0]).format("DD/MM/YYYY");
            onDateChange(date);
          }
        },
      });

      return () => {
        if (fp) {
          fp.destroy();
        }
      };
    }
  }, [inputRef, onDateChange, value, minDate, maxDate]);
};

export default useFlatpickr;
