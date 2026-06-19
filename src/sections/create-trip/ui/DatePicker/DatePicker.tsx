import { DayPicker, type DateRange } from 'react-day-picker'
import { ru } from 'date-fns/locale'
import 'react-day-picker/dist/style.css'
import './DatePicker.module.css'
import { memo } from 'react'

interface DatePickerProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
}

const DatePickerComponent = ({
  value,
  onChange,
}: DatePickerProps) => {
  return (
    <DayPicker
      mode='range'
      selected={value as DateRange | undefined}
      onSelect={onChange}
      disabled={{ before: new Date() }}
      required
      min={1}
      max={30}
      excludeDisabled
      locale={ru}
    />
  )
}

const DatePicker = memo(DatePickerComponent)

export { DatePicker }


