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
import { Checkbox } from '@/components/ui/checkbox';

import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';
import z from 'zod';
import { ModuleSchema, type TModule } from './type';
import { useUpdateModuleMutation } from '@/features/modules/modulesApi';
import DeleteModule from './DeleteModule';

type ModuleFormData = z.infer<typeof ModuleSchema>;

function EditModule({ item, trigger }: { item: TModule; trigger: React.ReactNode }) {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);

    const [updateCoursePlan, { isLoading }] = useUpdateModuleMutation();

    const form = useForm<ModuleFormData>({
        resolver: zodResolver(ModuleSchema),
        defaultValues: {
            title: '',
            description: '',
            isPublished: false,
        },
    });

    useEffect(() => {
        if (open && item) {
            form.reset({
                title: item.title || '',
                description: item.description || '',
                isPublished: item.isPublished || false,
            });
        }
    }, [open, item, form]);

    // console.log(item);

    const onSubmit = async (data: ModuleFormData) => {
        try {
            const res = await updateCoursePlan({ id: item.id, data }).unwrap();
            setOpen(false);
            toast.success(res.message || 'Course plan updated successfully');
        } catch (error) {
            console.error('Failed to update course plan:', error);
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <Drawer direction={isMobile ? 'bottom' : 'right'} open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent className={isMobile ? 'max-h-[90vh]' : 'h-screen'}>
                <DrawerHeader className="gap-1">
                    <div className="flex items-center justify-between">
                        <DrawerTitle>{item.title}</DrawerTitle>
                        <DeleteModule id={item.id} onSuccess={() => setOpen(false)} />
                    </div>
                    <DrawerDescription>Edit course module details</DrawerDescription>
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
                        {isLoading ? 'Saving...' : 'Update Course Module'}
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

export default EditModule;
