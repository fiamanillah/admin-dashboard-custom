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
import { LessonSchema } from './type';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useCreateLessonMutation } from '@/features/lessons/lessonsApi';
import { FileUploadDirectUploadDemo } from '@/components/common/FileUploadDirectUploadDemo';

function CreateLesson({ trigger }: { trigger: React.ReactNode }) {
    const { moduleId } = useParams();
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);
    const [createCourseLesson, { isLoading }] = useCreateLessonMutation();
    console.log(moduleId);

    const form = useForm<z.infer<typeof LessonSchema>>({
        resolver: zodResolver(LessonSchema),
        defaultValues: {
            moduleId: moduleId || '',
            contentData: {
                url: '',
                key: '',
            },
            isPublished: false,
            isPreview: false,
            requiredPlanLevel: 1,
            estimatedDurationMinutes: 0,
        },
    });

    const onSubmit = async (data: z.infer<typeof LessonSchema>) => {
        try {
            const res = await createCourseLesson(data).unwrap();
            toast.success(res.message || 'Course Lesson created successfully');
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
                    <DrawerTitle>Create New Module</DrawerTitle>
                    <DrawerDescription>
                        Fill in the details below to create a new module.
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
                                            <FormLabel>Publish</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* contentType */}
                            <FormField
                                control={form.control}
                                name="contentType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content Type *</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select content Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="video">Video</SelectItem>
                                                <SelectItem value="article">Article</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Estimated Time */}
                            <FormField
                                control={form.control}
                                name="estimatedDurationMinutes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Duration *</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="99.99"
                                                {...field}
                                                value={field.value || 0}
                                                onChange={e =>
                                                    field.onChange(e.target.valueAsNumber || 0)
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Content Url */}
                            <FormField
                                control={form.control}
                                name="contentData.key"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content Key *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://example.com/video"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Upload File */}
                            <FileUploadDirectUploadDemo
                                getKey={key => {
                                    form.setValue('contentData.key', key);
                                    toast.success('Content uploaded successfully!');
                                }}
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
                        {isLoading ? 'Creating...' : 'Create Course Module'}
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

export default CreateLesson;
