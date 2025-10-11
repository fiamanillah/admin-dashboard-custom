import type { ColumnDef } from '@tanstack/react-table';
import type { TLesson } from './type';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export const columns: ColumnDef<TLesson>[] = [
    {
        id: 'title',
        header: 'Title',
        accessorKey: 'title',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <div className="font-medium leading-none">{row.original.title}</div>
                </div>
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
        accessorKey: 'contentType',
        header: 'Type',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <div className="font-medium leading-none capitalize">
                        {row.original.contentType}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'isPublished',
        header: 'Status',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <div className="font-medium leading-none">
                        {row.original.isPublished ? 'Published' : 'Draft'}
                    </div>
                </div>
            );
        },
    },
];
