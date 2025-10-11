'use client';

import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useState } from 'react';
import type z from 'zod';
import { useParams } from 'react-router';
import { ModuleSchema } from './type';
import { Checkbox } from '@/components/ui/checkbox';
import { useCreateModuleMutation } from '@/features/modules/modulesApi';

function CreateModule({ trigger }: { trigger: React.ReactNode }) {
    const { courseId } = useParams();
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);
    const [createCoursePlan, { isLoading }] = useCreateModuleMutation();

    const form = useForm<z.infer<typeof ModuleSchema>>({
        resolver: zodResolver(ModuleSchema),
        defaultValues: {
            courseId: courseId || '',
            title: '',
            description: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof ModuleSchema>) => {
        try {
            const res = await createCoursePlan(data).unwrap();
            toast.success(res.message || 'Course plan created successfully');
            form.reset();
            setOpen(false);
        } catch (error) {
            console.error('Failed to create course plan:', error);
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <Drawer direction={isMobile ? 'bottom' : 'right'} open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent className={isMobile ? 'max-h-[90vh]' : 'h-screen'}>
                <DrawerHeader>
                    <DrawerTitle>Create New Course Plan</DrawerTitle>
                    <DrawerDescription>
                        Fill in the details below to create a new course plan.
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto px-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-4">
                            {/* Title */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Premium Plan" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description *</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe this course plan..."
                                                className="min-h-[80px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* isPublished */}
                            <FormField
                                control={form.control}
                                name="isPublished"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Includes Future Updates</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>

                <DrawerFooter>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full"
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        {isLoading ? 'Creating...' : 'Create Course Plan'}
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="outline" type="button">
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default CreateModule;
