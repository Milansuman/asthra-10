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
import { toast } from 'sonner';
import { AsthraCardPreview } from './card';
import UploadMediaInline from './upload-inline';
import { TiptapEditor } from './tiptap-editor';

const FormSchema = eventZod
    .omit({
        createdAt: true,
        createdById: true,
        id: true,
        regCount: true,
        updatedAt: true,
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

export const EventForm: React.FC<{
    data: EventEdit | null;
    id?: string;
    onChangeEvent: () => void;
    isModal?: boolean
}> = ({
    data,
    id,
    onChangeEvent,
    isModal = false
}) => {
        const [previewData, setPreviewData] = useState<EventEdit | null>(data);

        const { mutateAsync: createEvent, isPending } =
            api.event.createEvent.useMutation({
                onSuccess: () => {
                    toast.success('Event Created', {
                        style: {
                            background: '#10b981',
                            color: 'white',
                            border: '1px solid #059669',
                        },
                    });
                    onChangeEvent();
                },
                onError: (error) => {
                    toast.error(`Event Creation Failed - ${error.data?.code}`, {
                        description: error.message,
                        style: {
                            background: '#ef4444',
                            color: 'white',
                            border: '1px solid #dc2626',
                        },
                    });
                }
            });

        const { mutateAsync: updateEvent, isPending: isUpdating } =
            api.event.updateEvent.useMutation({
                onSuccess: () => {
                    toast.success('Event Updated', {
                        style: {
                            background: '#10b981',
                            color: 'white',
                            border: '1px solid #059669',
                        },
                    });
                    onChangeEvent();
                },
                onError: (error) => {
                    toast.error(`Event Update Failed - ${error.data?.code}`, {
                        description: error.message,
                        style: {
                            background: '#ef4444',
                            color: 'white',
                            border: '1px solid #dc2626',
                        },
                    });
                }
            });

        const form = useForm<EventEdit>({
            resolver: zodResolver(FormSchema),
            defaultValues: data ?? {
                name: '',
                description: null,
                secret: null,
                poster: '',
                venue: '',
                dateTimeStarts: new Date(),
                regLimit: 0,
                amount: 0,
                eventStatus: 'pending',
                eventType: 'WORKSHOP',
                department: 'NA',
                registrationType: 'both',
                dateTimeEnd: null,
            },
        });

        const onSubmit = async (values: EventEdit) => {
            try {
                if (id) {
                    await updateEvent({ id, ...values });
                } else {
                    await createEvent(values);
                }
            } catch (error) {
                console.error('Form submission error:', error);
            }
        };

        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                            Basic Information
                        </h3>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-700">Event Name *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter event name"
                                                {...field}
                                                value={field.value ?? ''}
                                                className="border-slate-300 focus:border-slate-500"
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
                                        <FormLabel className="text-slate-700">Status</FormLabel>
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">Description</FormLabel>
                                    <FormControl>
                                        <TiptapEditor
                                            value={field.value ?? ''}
                                            onChange={field.onChange}
                                            placeholder="Enter event description..."
                                        />
                                    </FormControl>
                                    <FormDescription className="text-slate-600">
                                        Provide a detailed description of your event
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
                                    <FormLabel className="text-slate-700">Secret Message</FormLabel>
                                    <FormControl>
                                        <TiptapEditor
                                            value={field.value ?? ''}
                                            onChange={field.onChange}
                                            placeholder="Enter secret message for registered users..."
                                        />
                                    </FormControl>
                                    <FormDescription className="text-slate-600">
                                        This message will be sent to registered users via email
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Event Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                            Event Details
                        </h3>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="venue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-700">Venue *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter venue"
                                                {...field}
                                                value={field.value ?? ''}
                                                className="border-slate-300 focus:border-slate-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="eventType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-700">Event Type</FormLabel>
                                        <Select
                                            {...field}
                                            onValueChange={(event) => {
                                                field.onChange(event);
                                                setPreviewData(form.getValues());
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-700">Department</FormLabel>
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
                                                    <SelectLabel>Department</SelectLabel>
                                                    {Object.entries(allDepartments).map(([dep, full]) => (
                                                        <SelectItem key={dep} value={dep}>
                                                            {full}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="registrationType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-700">Registration Type</FormLabel>
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
                                                    {Object.keys(registrationTypeEnum).map((type) => (
                                                        <SelectItem key={type} value={type}>
                                                            {registrationTypeEnum[type]}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="regLimit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-700">Registration Limit</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter limit"
                                                {...field}
                                                value={field.value ?? ''}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                className="border-slate-300 focus:border-slate-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-700">Amount (₹)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter amount"
                                                {...field}
                                                value={field.value ?? ''}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                className="border-slate-300 focus:border-slate-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                            Date & Time
                        </h3>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="dateTimeStarts"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-700">Start Date & Time *</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="datetime-local"
                                                {...field}
                                                value={field.value ? field.value.toISOString().slice(0, 16) : ''}
                                                onChange={(e) => field.onChange(new Date(e.target.value))}
                                                className="border-slate-300 focus:border-slate-500"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-slate-600">
                                            Default is {AsthraStartsAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dateTimeEnd"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-700">End Time</FormLabel>
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Media */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                            Media & Assets
                        </h3>

                        <FormField
                            control={form.control}
                            name="poster"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">Poster Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter poster image URL"
                                            {...field}
                                            value={field.value ?? ''}
                                            className="border-slate-300 focus:border-slate-500"
                                        />
                                    </FormControl>
                                    <FormDescription className="text-slate-600">
                                        Provide a URL to your event poster image
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <UploadMediaInline />
                    </div>

                    {/* Preview */}
                    {previewData && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                                Preview
                            </h3>
                            <AsthraCardPreview data={previewData} />
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                // Handle cancel
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending || isUpdating}
                            className="bg-slate-900 hover:bg-slate-800"
                        >
                            {isPending || isUpdating ? (
                                <>
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                    {id ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                id ? 'Update Event' : 'Create Event'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        );
    };
