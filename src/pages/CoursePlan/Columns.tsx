import type { ColumnDef } from '@tanstack/react-table';
import type { TCoursePlan } from './type';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import EditCoursePlan from './EditCoursePlan';

export const columns: ColumnDef<TCoursePlan>[] = [
    {
        id: 'title',
        header: 'Title',
        accessorKey: 'title',
        cell: ({ row }) => {
            return (
                <EditCoursePlan item={row.original} trigger={<span>{row.original.title}</span>} />
            );
        },
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => {
            const description = row.original.description || '—';

            if (description.length <= 50) {
                return <p className="whitespace-pre-wrap text-sm">{description}</p>;
            }
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-auto justify-start text-left text-sm p-2"
                        >
                            <p className="text-sm flex items-center gap-2">
                                {description.length > 50
                                    ? description.slice(0, 30) + '...'
                                    : description}
                                <ChevronDown size={16} />
                            </p>
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className=" p-4" align="start">
                        <ScrollArea className="max-h-[60vh]">
                            <p className="whitespace-pre-wrap text-sm">{description}</p>
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
            );
        },
    },
    {
        accessorKey: 'basePrice',
        header: 'Price',
        cell: ({ row }) => {
            const { basePrice, discountedPrice } = row.original;

            return (
                <div className="flex flex-col">
                    <span className="font-semibold">${discountedPrice}</span>
                    {discountedPrice ? (
                        <span className="text-xs line-through text-muted-foreground">
                            ${basePrice}
                        </span>
                    ) : null}
                </div>
            );
        },
    },
    {
        accessorKey: 'features',
        header: 'Features',
        cell: ({ row }) => {
            const features = row.original.features;

            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-auto justify-start text-left text-sm p-2"
                        >
                            <p className="text-sm flex items-center gap-2">
                                {features.length} {features.length === 1 ? 'Feature' : 'Features'}
                                <ChevronDown size={16} />
                            </p>
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className=" p-4" align="start">
                        <ScrollArea className="max-h-[60vh]">
                            <ul className="list-disc pl-4">
                                {features.map(feature => (
                                    <li key={feature} className="whitespace-pre-wrap text-sm">
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
            );
        },
    },
    {
        accessorKey: 'accessDurationDays',
        header: 'Access Duration',
        cell: ({ row }) => {
            const { accessDurationDays } = row.original;

            return (
                <div className="flex flex-col">
                    <span className="font-semibold">{accessDurationDays}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'contentAccess',
        header: 'Content Access',
        cell: ({ row }) => {
            const { contentAccess } = row.original;

            return (
                <div className="flex flex-col">
                    <span className="font-semibold">{contentAccess}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'includesCertificate',
        header: 'Certificate',
        cell: ({ row }) => {
            const { includesCertificate } = row.original;

            return (
                <div className="flex flex-col">
                    <span className="font-semibold">{includesCertificate ? 'Yes' : 'No'}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'includesCommunityAccess',
        header: 'Community Access',
        cell: ({ row }) => {
            const { includesCommunityAccess } = row.original;

            return (
                <div className="flex flex-col">
                    <span className="font-semibold">{includesCommunityAccess ? 'Yes' : 'No'}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'includesFutureUpdates',
        header: 'Future Updates',
        cell: ({ row }) => {
            const { includesFutureUpdates } = row.original;

            return (
                <div className="flex flex-col">
                    <span className="font-semibold">{includesFutureUpdates ? 'Yes' : 'No'}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'affiliateCommissionRate',
        header: 'Affiliate Commission',
        cell: ({ row }) => {
            const { affiliateCommissionRate } = row.original;

            return (
                <div className="flex flex-col">
                    <span className="font-semibold">{affiliateCommissionRate}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'isActive',
        header: 'Status',
        cell: ({ row }) => {
            const { isActive } = row.original;

            return (
                <div className="flex flex-col">
                    <span className="font-semibold">{isActive ? 'Active' : 'Inactive'}</span>
                </div>
            );
        },
    },
];
