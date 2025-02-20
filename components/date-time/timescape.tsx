'use client';

import { cn } from '@/lib/utils';
import {
  type HTMLAttributes,
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
} from 'react';
import type { Options } from 'timescape';
//time-picker.tsx
import { type DateType, useTimescape } from 'timescape/react';

export type TimePickerProps = HTMLAttributes<HTMLDivElement> & {
  value?: Date;
  onChange: (date?: Date) => void;
  children: ReactNode;
  options?: Omit<Options, 'date' | 'onChangeDate'>;
};
type TimePickerContextValue = ReturnType<typeof useTimescape>;
const TimePickerContext = createContext<TimePickerContextValue | null>(null);

const useTimepickerContext = (): TimePickerContextValue => {
  const context = useContext(TimePickerContext);
  if (!context) {
    throw new Error(
      'Unable to access TimePickerContext. This component should be wrapped by a TimePicker component'
    );
  }
  return context;
};

const TimePicker = forwardRef<React.ElementRef<'div'>, TimePickerProps>(
  ({ value, onChange, options, className, ...props }, ref) => {
    const timePickerContext = useTimescape({
      date: value,
      onChangeDate: onChange,
      ...options,
    });
    return (
      <TimePickerContext.Provider value={timePickerContext}>
        <div
          ref={ref}
          {...props}
          className={cn(
            'flex w-full min-h-10 items-center rounded-s justify-center border border-input bg-background px-0 py-1 text-md',
            'ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
        />
      </TimePickerContext.Provider>
    );
  }
);
TimePicker.displayName = 'TimePicker';

type TimePickerSegmentProps = Omit<
  HTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> & {
  segment: DateType;
  inputClassName?: string;
};

const TimePickerSegment = forwardRef<
  React.ElementRef<'input'>,
  TimePickerSegmentProps
>(({ segment, inputClassName, className, ...props }, ref) => {
  const { getInputProps } = useTimepickerContext();
  const { ref: timePickerInputRef } = getInputProps(segment);
  return (
    <div
      className={cn(
        'rounded-s w-[120px] focus-within:bg-accent text-center text-accent-foreground px-1 py-1 mx-1'
      )}
    >
      <input
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else {
            if (ref) ref.current = node;
          }
          timePickerInputRef(node);
        }}
        {...props}
        className={cn(
          'tabular-nums caret-transparent !w-full text-center',
          'bg-transparent ring-0 ring-offset-0 border-transparent focus-visible:border-transparent focus-visible:ring-0 outline-none',
          inputClassName
        )}
      />
      <p>{segment.slice(0, -1)}</p>
    </div>
  );
});
TimePickerSegment.displayName = 'TimePickerSegment';

type TimePickerSeparatorProps = HTMLAttributes<HTMLSpanElement>;
const TimePickerSeparator = forwardRef<
  React.ElementRef<'span'>,
  TimePickerSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <span ref={ref} {...props} className={cn('text-sm py-1 cal', className)} />
  );
});
TimePickerSeparator.displayName = 'TimePickerSeparator';

export { TimePicker, TimePickerSegment, TimePickerSeparator };
