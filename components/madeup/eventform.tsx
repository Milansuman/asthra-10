'use client';

import {
  AsthraStartsAt,
  allDepartments,
  endTime,
  eventStatus,
  eventType,
  registrationTypeEnum,
} from '@/logic';
import { api } from '@/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, ExternalLink, Eye, Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

import { eventZod } from '@/lib/validator';

import {
  TimePicker,
  TimePickerSegment,
  TimePickerSeparator,
} from '@/components/date-time/timescape';
import { AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RichEditor } from './editor';

import { toast } from 'sonner';
import { AsthraCardPreview } from './card';

const FormSchema = eventZod
  .omit({
    createdAt: true,
    createdById: true,
    id: true,
    regCount: true,
    regLimit: true,
    updatedAt: true,
    amount: true,
  })
  .strict()
  .merge(
    z.object({
      poster: z.string().optional(),
      name: z.string().min(3),
      description: z.string(),
      secret: z.string().nullable().default(null),

      venue: z.string().min(3),
      dateTimeStarts: z.date().refine((date) => date > AsthraStartsAt, {
        message: 'Date must be in the future',
      }),
      regLimit: z.number().nonnegative().default(0),
      amount: z.number().nonnegative().default(0),
    })
  );

export type EventEdit = z.infer<typeof FormSchema>;

export const EventForm: React.FC<{ data: EventEdit | null; id?: string, onChangeEvent: () => void }> = ({
  data,
  id,
  onChangeEvent
}) => {
  const [previewData, setPreviewData] = useState<EventEdit | null>(data);

  console.log(data);
  const { mutateAsync: createEvent, isPending } =
    api.event.createEvent.useMutation({
      onSuccess: () => {
        toast('Event Created', {
          description: 'Event has been created successfully',
        });
        onChangeEvent();
      },
      onError: (e) => {
        toast('Error', {
          description: e.message,
          //   variant: 'destructive',
        });
      },
    });
  const { mutateAsync: updateEvent } = api.event.updateEvent.useMutation({
    onSuccess: () => {
      toast('Event Updated', {
        description: 'Event has been updated successfully',
      });
      onChangeEvent();
    },
    onError: (e) => {
      toast('Error', {
        description: e.message,
        // variant: 'destructive',
      });
    },
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      venue: 'SJCET',
      eventStatus: 'uploaded',
      amount: 20,
      department: 'NA',
      regLimit: 0,
      eventType: 'ASTHRA_PASS_EVENT',
      dateTimeStarts: AsthraStartsAt,
      dateTimeEnd: 'NA',
      registrationType: 'both',
      poster: '/assets/poster.jpg',
      secret: null,

      ...(data ? data : {}),
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("submitting data", data)
    id !== undefined
      ? await updateEvent({ ...data, id })
      : await createEvent(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 rounded-none">
        <div className="grid grid-cols-1 gap-[10px] w-full md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter event name"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue>{field.value}</SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      {Object.keys(eventStatus).map((type) => (
                        <SelectItem key={type} value={type}>
                          {eventStatus[type]}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />{' '}
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <RichEditor content={field.value ?? ""} onUpdate={(e) => {
                  console.log(e.data)
                  field.onChange({
                    ...e,
                    target: {
                      value: e.data
                    }
                  })
                }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secret Description</FormLabel>
              <FormControl>
                <RichEditor content={field.value ?? ""} onUpdate={(e) => {
                  console.log(e.data)
                  field.onChange({
                    ...e,
                    target: {
                      value: e.data
                    }
                  })
                }} />
              </FormControl>
              <FormDescription className='text-neutral-300'>
                Sent your secret message to registered users through email
                (markdown supported)
              </FormDescription>
              <FormDescription className='text-neutral-300'>
                Eg: Here is the G-Form to update your team details
                [Here](https://example.com/form)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="poster"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poster Image Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter link"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange({
                      ...e,
                      target: { value: value.length === 0 ? undefined : value },
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
              <Button
                link={id ? `/dashboard/upload?id=${id}` : '/dashboard/upload'}
                className=" gap-3 w-full h-12 mt-2 text-white"
                variant={'secondary'}
              >
                Optional, But upload your image before editing <ExternalLink />
              </Button>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="venue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Venue</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter venue"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormDescription className='text-neutral-300'>
                EG: ROOM 303, BLOCK SPB, 2nd FLOOR
              </FormDescription>
              <FormMessage />{' '}
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-[10px] w-full md:grid-cols-2">
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Department</FormLabel>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue>{field.value.toUpperCase()}</SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Departments</SelectLabel>
                      {Object.entries(allDepartments)
                        .filter(([key, _]) => key !== 'es')
                        .map(([short, long]) => (
                          <SelectItem key={short} value={short}>
                            ({short.toUpperCase()}) {long}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />{' '}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registrationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Type</FormLabel>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue>{field.value}</SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type</SelectLabel>
                      {Object.entries(registrationTypeEnum).map(
                        ([type, text]) => (
                          <SelectItem key={type} value={type}>
                            {text}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />{' '}
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-[10px] w-full md:grid-cols-2">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    previewData ? <>
                      {previewData?.eventType === "ASTHRA_PASS_EVENT" ? "Credit" : "Amount"}
                    </> : <>Credit</>
                  }
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    {...field}
                    onChange={(e) => {
                      field.onChange({
                        ...e,
                        target: { value: Number.parseInt(e.target.value) },
                      });
                    }}
                  />
                </FormControl>
                <FormDescription className='text-neutral-300'>
                  Default is ₹20
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="regLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Limit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Limit"
                    {...field}
                    onChange={(e) => {
                      field.onChange({
                        ...e,
                        target: { value: Number.parseInt(e.target.value) },
                      });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="dateTimeStarts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input
                  type='datetime-local'
                  defaultValue={
                    field.value
                      ? new Date(field.value.getTime() - (field.value.getTimezoneOffset() * 60000))
                        .toISOString()
                        .slice(0, 16)
                      : new Date(AsthraStartsAt.getTime() - (AsthraStartsAt.getTimezoneOffset() * 60000))
                        .toISOString()
                        .slice(0, 16)
                  }
                  onChange={(event) => {
                    const datetimeStr = event.target.value;
                    // Create date in local timezone then adjust for Indian timezone (UTC+5:30)
                    const localDate = new Date(datetimeStr);

                    // This ensures the date is treated as being in the user's local timezone
                    // rather than UTC, preserving the exact time the user selected
                    field.onChange({
                      ...event,
                      target: {
                        value: localDate
                      }
                    });
                  }}
                />
              </FormControl>
              <FormDescription className='text-neutral-300'>
                Default is {AsthraStartsAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-[10px] w-full md:grid-cols-2">
          <FormField
            control={form.control}
            name="dateTimeEnd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End time</FormLabel>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue>{field.value}</SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Time</SelectLabel>
                      {Object.keys(endTime).map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />{' '}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Type</FormLabel>
                <Select
                  {...field}
                  onValueChange={(event) => {
                    field.onChange(event)
                    setPreviewData(form.getValues())
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue>{field.value}</SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type</SelectLabel>
                      {Object.keys(eventType)
                        .filter((e) => e !== 'ASTHRA_PASS')
                        .map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />{' '}
              </FormItem>
            )}
          />
        </div>

        <div className="md:flex-row flex-col-reverse flex gap-[10px] ">
          <AlertDialogCancel asChild>
            <Button
              variant="secondary"
              className="flex-1 text-center"
            >
              Cancel
            </Button>
          </AlertDialogCancel>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="flex-1 text-center"
                onClick={() => {
                  setPreviewData(form.getValues())
                }}
              >
                Preview <Eye />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl rounded-none text-white">
              <DialogHeader>
                <DialogTitle>Are you absolutely about creation?</DialogTitle>
                <DialogDescription className="text-neutral-200">
                  This action creates a new event and is irreversible.
                </DialogDescription>
              </DialogHeader>
              <div>
                <AsthraCardPreview data={previewData!} />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="secondary"
                    className="flex-1 text-center"
                  >
                    Back to Edit
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button className="flex-1 text-center rounded-none" type="submit">
            {!isPending ? (
              <>
                Continue <ChevronRight />
              </>
            ) : (
              <Loader className="animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
