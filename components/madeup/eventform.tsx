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
import MDEditor from '@uiw/react-md-editor';
import { toast } from 'sonner';
import { AsthraCardPreview } from './card';
import { restoreGlobalScroll } from './card';

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
      description: z.string().nullable().default(null),
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

export const EventForm: React.FC<{ data: EventEdit | null; id?: string, onChangeEvent: () => void, isModal?: boolean }> = ({
  data,
  id,
  onChangeEvent,
  isModal = false
}) => {
  const [previewData, setPreviewData] = useState<EventEdit | null>(data);

  console.log(data);
  const { mutateAsync: createEvent, isPending } =
    api.event.createEvent.useMutation({
      onSuccess: () => {
        toast.success('Event Created', {
          description: 'Event has been created successfully',
          style: {
            background: '#10b981',
            color: 'white',
            border: '1px solid #059669',
          },
        });
        onChangeEvent();
      },
      onError: (e) => {
        toast.error('Error', {
          description: e.message,
          style: {
            background: '#ef4444',
            color: 'white',
            border: '1px solid #dc2626',
          },
        });
      },
    });
  const { mutateAsync: updateEvent } = api.event.updateEvent.useMutation({
    onSuccess: () => {
      toast.success('Event Updated', {
        description: 'Event has been updated successfully',
        style: {
          background: '#10b981',
          color: 'white',
          border: '1px solid #059669',
        },
      });
      onChangeEvent();
    },
    onError: (e) => {
      toast.error('Error', {
        description: e.message,
        style: {
          background: '#ef4444',
          color: 'white',
          border: '1px solid #dc2626',
        },
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
    console.log(data)
    try {
      if (id !== undefined) {
        await updateEvent({ ...data, id });
      } else {
        await createEvent(data);
      }
      // Restore scroll after successful submission
      setTimeout(() => {
        restoreGlobalScroll();
      }, 100);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className={isModal ? "w-full h-full overflow-y-auto" : "min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8 relative"}>
      {!isModal && (
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23f3f4f6&quot; fill-opacity=&quot;0.4&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      )}
      <div className={isModal ? "w-full p-4" : "container mx-auto max-w-4xl px-4 relative z-10"}>
        {/* Show heading for both modal and standalone, but different styling */}
        <div className={`mb-6 text-center ${isModal ? 'mb-4' : ''}`}>
          <h1 className={`font-bold text-gray-900 mb-2 ${isModal ? 'text-2xl' : 'text-3xl'}`}>
            {id ? 'Edit Event' : 'Create New Event'}
          </h1>
          <p className="text-gray-600">
            {id ? 'Update your event details below' : 'Fill in the details to create a new event'}
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-4 md:space-y-5 rounded-xl bg-white/95 backdrop-blur-sm p-4 md:p-8 shadow-2xl border-0 ring-1 ring-gray-200/50 ${isModal ? 'bg-white' : ''} max-w-full overflow-hidden`}>
            <div className="grid grid-cols-1 gap-3 md:gap-[10px] w-full md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 font-semibold text-sm md:text-base">Event Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter event name"
                        {...field}
                        value={field.value ?? ''}
                        className="h-12 md:h-auto text-base"
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
                    <FormLabel className="text-gray-800 font-semibold">Status</FormLabel>
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
                  <FormLabel className="text-gray-800 font-semibold">Description</FormLabel>
                  <FormControl>
                    <div className="w-full overflow-x-auto">
                      <MDEditor
                        height={300}
                        preview="edit"
                        style={{ background: "white" }}
                        textareaProps={{
                          placeholder: "Enter the description...",
                          style: { color: "black" }
                        }}
                        value={(field.value as string) ?? ''}
                        onChange={(e) => {
                          field.onChange({
                            target: {
                              value: e
                            }
                          })
                        }}
                        className="[&_.w-md-editor-text]:!text-black [&_.w-md-editor-text-input]:!text-black min-w-[320px] md:min-w-full"
                      />
                    </div>
                  </FormControl>
                  <FormDescription className='text-gray-600'>
                    Sent your secret message to registered users through email
                    (markdown supported)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="secret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 font-semibold">Secret Description</FormLabel>
                  <FormControl>
                    <div className="w-full overflow-x-auto">
                      <MDEditor
                        height={300}
                        preview="edit"
                        style={{ background: "white" }}
                        value={(field.value as string) ?? ''}
                        textareaProps={{
                          placeholder: "Enter the secret message...",
                          style: { color: "black" }
                        }}
                        onChange={(e) => {
                          field.onChange({
                            target: {
                              value: e
                            }
                          })
                        }}
                        className="[&_.w-md-editor-text]:!text-black [&_.w-md-editor-text-input]:!text-black min-w-[320px] md:min-w-full"
                      />
                    </div>
                  </FormControl>
                  <FormDescription className='text-gray-600'>
                    Sent your secret message to registered users through email
                    (markdown supported)
                  </FormDescription>
                  <FormDescription className='text-gray-600'>
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
                    className="gap-3 w-full h-12 mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300"
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
                  <FormDescription className='text-gray-600'>
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
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || value === null || value === undefined) {
                            field.onChange(20); // Default to ₹20
                          } else {
                            const parsedValue = Number.parseInt(value, 10);
                            if (!isNaN(parsedValue)) {
                              field.onChange(parsedValue);
                            } else {
                              field.onChange(20); // Default to ₹20
                            }
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription className='text-gray-600'>
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
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || value === null || value === undefined) {
                            field.onChange(0);
                          } else {
                            const parsedValue = Number.parseInt(value, 10);
                            if (!isNaN(parsedValue)) {
                              field.onChange(parsedValue);
                            } else {
                              field.onChange(0);
                            }
                          }
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
                        field.value && field.value instanceof Date && !isNaN(field.value.getTime())
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
                  <FormDescription className='text-gray-600'>
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
                  onClick={() => {
                    // Restore scroll when cancel is clicked
                    setTimeout(() => {
                      restoreGlobalScroll();
                    }, 100);
                  }}
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
                <DialogContent className="max-w-6xl max-h-[90vh] rounded-none text-black overflow-hidden flex flex-col">
                  <DialogHeader className="flex-shrink-0 pb-4">
                    <DialogTitle>Are you absolutely about creation?</DialogTitle>
                    <DialogDescription className="text-black">
                      This action creates a new event and is irreversible.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-y-auto min-h-0 px-1">
                    <AsthraCardPreview data={previewData!} />
                  </div>
                  <DialogFooter className="flex-shrink-0 pt-4">
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
      </div>
    </div >
  );
};

export default EventForm;
