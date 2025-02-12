import { useState } from "react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface CalendarProps {
  label?: string;
  placeholder?: string[];
  className?: string;
  value?: [Date | null, Date | null];
  onChange?: (value: [Date | null, Date | null]) => void;
}

export function Calendar({
  label,
  placeholder = ['시작일', '종료일'],
  className,
  value,
  onChange,
}: CalendarProps) {
  const [selectedDates, setSelectedDates] = useState<
    [Date | null, Date | null]
  >(value || [null, null]);

  const today = dayjs().startOf("day");

  const handleDateChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
  ) => {
    if (dates) {
      const startDate = dates[0]?.toDate() || null;
      const endDate = dates[1]?.toDate() || null;
      setSelectedDates([startDate, endDate]);
      onChange?.([startDate, endDate]);
    } else {
      setSelectedDates([null, null]);
      onChange?.([null, null]);
    }
  };

  return (
    <div className="calendar-component">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <DatePicker.RangePicker
        value={
          selectedDates[0] && selectedDates[1]
            ? [dayjs(selectedDates[0]), dayjs(selectedDates[1])]
            : null
        }
        onChange={handleDateChange}
        placeholder={[placeholder[0], placeholder[1]]}
        className={`w-full rounded-lg border border-gray-300 p-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        format="YYYY-MM-DD"
        allowClear={true}
        disabledDate={(current) => current.isBefore(today, "day")}
        popupClassName="custom-range-picker"
      />
    </div>
  );
}
