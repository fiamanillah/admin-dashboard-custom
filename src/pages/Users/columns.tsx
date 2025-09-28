import { type ColumnDef } from '@tanstack/react-table';
import { formatDate } from '@/utils/formatDate';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import EditUser from './EditUser';
import type { TUser } from './type';

export const columns: ColumnDef<TUser>[] = [
    {
        id: 'avatarUrl',
        accessorKey: 'avatarUrl',
        header: 'Avatar',
        cell: ({ row }) => (
            <EditUser
                item={row.original}
                trigger={
                    <Avatar>
                        <AvatarImage
                            src={row?.original.avatarUrl || ''}
                            alt={row?.original.displayName}
                        />
                        <AvatarFallback className="rounded-lg">
                            {row?.original.firstName[0]}
                        </AvatarFallback>
                    </Avatar>
                }
            />
        ),
    },
    {
        id: 'displayName',
        accessorKey: 'displayName',
        header: 'Name',
        cell: ({ row }) => {
            return (
                <EditUser
                    item={row.original}
                    trigger={
                        <span className="truncate hover:underline">{row.original.displayName}</span>
                    }
                />
            );
        },
    },
    {
        id: 'email',
        accessorKey: 'email',
        header: 'Email',
    },
    {
        id: 'role',
        accessorKey: 'role',
        header: 'Role',
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
    },
    {
        id: 'createdAt',
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => formatDate(row.original.createdAt || ''),
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const user = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.id || '')}
                        >
                            Copy User ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
