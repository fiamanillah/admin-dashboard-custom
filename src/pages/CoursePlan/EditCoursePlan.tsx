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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useUpdateCoursePlanMutation } from '@/features/coursePlan/coursePlanApi';
import z from 'zod';
import coursePlanSchema, { type TCoursePlan } from './type';
import { X, Plus } from 'lucide-react';
import DeleteCoursePlan from './DeleteCoursePlan';

type CoursePlanFormData = z.infer<typeof coursePlanSchema>;

function EditCoursePlan({ item, trigger }: { item: TCoursePlan; trigger: React.ReactNode }) {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);
    const [featureInput, setFeatureInput] = useState('');

    const [updateCoursePlan, { isLoading }] = useUpdateCoursePlanMutation();

    const form = useForm<CoursePlanFormData>({
        resolver: zodResolver(coursePlanSchema),
        defaultValues: {
            title: '',
            description: '',

            features: [],
            basePrice: 0,
            discount: 0,
            accessDurationDays: 365,
            contentAccess: 'Full',
            includesCertificate: false,
            certificateType: 'Completion',
            includesCommunityAccess: false,
            includesFutureUpdates: false,
            affiliateCommissionRate: 0,
            affiliateEnabled: false,
            isActive: false,
        },
    });

    useEffect(() => {
        if (open && item) {
            form.reset({
                title: item.title || '',
                description: item.description || '',

                features: item.features || [],
                basePrice: parseFloat(item.basePrice) || 0,
                discount: item.discount ? parseFloat(item.discount) : 0,
                accessDurationDays: item.accessDurationDays || 365,
                contentAccess: (item.contentAccess as 'Full' | 'Partial') || 'Full',
                includesCertificate: item.includesCertificate || false,
                certificateType:
                    (item.certificateType as
                        | 'Completion'
                        | 'Certificate of Achievement'
                        | 'None') || 'Completion',
                includesCommunityAccess: item.includesCommunityAccess || false,
                includesFutureUpdates: item.includesFutureUpdates || false,
                affiliateCommissionRate: parseFloat(item.affiliateCommissionRate) || 0,
                affiliateEnabled: item.affiliateEnabled || false,
                isActive: item.isActive || false,
            });
        }
    }, [open, item, form]);

    const onSubmit = async (data: CoursePlanFormData) => {
        try {
            const res = await updateCoursePlan({ id: item.id, data }).unwrap();
            setOpen(false);
            toast.success(res.message || 'Course plan updated successfully');
        } catch (error) {
            console.error('Failed to update course plan:', error);
            toast.error(getErrorMessage(error));
        }
    };

    const addFeature = () => {
        if (featureInput.trim()) {
            const currentFeatures = form.getValues('features');
            form.setValue('features', [...currentFeatures, featureInput.trim()]);
            setFeatureInput('');
        }
    };

    const removeFeature = (index: number) => {
        const currentFeatures = form.getValues('features');
        form.setValue(
            'features',
            currentFeatures.filter((_, i) => i !== index)
        );
    };

    return (
        <Drawer direction={isMobile ? 'bottom' : 'right'} open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent className={isMobile ? 'max-h-[90vh]' : 'h-screen'}>
                <DrawerHeader className="gap-1">
                    <div className="flex items-center justify-between">
                        <DrawerTitle>{item.title}</DrawerTitle>
                        <DeleteCoursePlan id={item.id} onSuccess={() => setOpen(false)} />
                    </div>
                    <DrawerDescription>Edit course plan details</DrawerDescription>
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

                            {/* Features - Dynamic */}
                            <FormField
                                control={form.control}
                                name="features"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Features *</FormLabel>
                                        <div className="space-y-2">
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="Add a feature..."
                                                    value={featureInput}
                                                    onChange={e => setFeatureInput(e.target.value)}
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            addFeature();
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    onClick={addFeature}
                                                    disabled={!featureInput.trim()}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            {field.value && field.value.length > 0 && (
                                                <div className="space-y-1">
                                                    {field.value.map((feature, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center justify-between rounded-md border bg-muted px-3 py-2"
                                                        >
                                                            <span className="text-sm">
                                                                {feature}
                                                            </span>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-6 w-6"
                                                                onClick={() => removeFeature(index)}
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Base Price */}
                            <FormField
                                control={form.control}
                                name="basePrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Base Price *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="199.99"
                                                type="number"
                                                step="0.01"
                                                value={field.value}
                                                onChange={e =>
                                                    field.onChange(parseFloat(e.target.value) || 0)
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Discount */}
                            <FormField
                                control={form.control}
                                name="discount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Discount (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="0-100"
                                                type="number"
                                                value={field.value}
                                                onChange={e =>
                                                    field.onChange(parseFloat(e.target.value) || 0)
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Access Duration (Days) */}
                            <FormField
                                control={form.control}
                                name="accessDurationDays"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Access Duration (Days) *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="365"
                                                type="number"
                                                value={field.value}
                                                onChange={e =>
                                                    field.onChange(parseInt(e.target.value) || 0)
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Content Access */}
                            <FormField
                                control={form.control}
                                name="contentAccess"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content Access *</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select content access" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Full">Full Access</SelectItem>
                                                <SelectItem value="Partial">
                                                    Partial Access
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Includes Certificate */}
                            <FormField
                                control={form.control}
                                name="includesCertificate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Includes Certificate</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Certificate Type */}
                            <FormField
                                control={form.control}
                                name="certificateType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Certificate Type *</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select certificate type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Completion">
                                                    Completion
                                                </SelectItem>
                                                <SelectItem value="Certificate of Achievement">
                                                    Certificate of Achievement
                                                </SelectItem>
                                                <SelectItem value="None">None</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Includes Community Access */}
                            <FormField
                                control={form.control}
                                name="includesCommunityAccess"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Includes Community Access</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Includes Future Updates */}
                            <FormField
                                control={form.control}
                                name="includesFutureUpdates"
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

                            {/* Affiliate Commission Rate */}
                            <FormField
                                control={form.control}
                                name="affiliateCommissionRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Affiliate Commission Rate (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="0-100"
                                                type="number"
                                                value={field.value}
                                                onChange={e =>
                                                    field.onChange(parseFloat(e.target.value) || 0)
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Affiliate Enabled */}
                            <FormField
                                control={form.control}
                                name="affiliateEnabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Affiliate Enabled</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Is Active */}
                            <FormField
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Is Active</FormLabel>
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
                        {isLoading ? 'Saving...' : 'Update Course Plan'}
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

export default EditCoursePlan;
