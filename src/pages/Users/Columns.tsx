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
import { ChevronDown, LinkIcon, Loader, MoreHorizontal } from 'lucide-react';
import EditUser from './EditUser';
import type { TUser } from './type';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import DeleteUser from './DeleteUser';
import { toast } from 'sonner';

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
        cell: ({ row }) => (
            <Badge className={`capitalize ${row.original.role === 'admin' && 'bg-destructive'}`}>
                {row.original.role}
            </Badge>
        ),
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
            <Badge
                className={`capitalize ${
                    row.original.status === 'active'
                        ? 'bg-chart-2'
                        : row.original.status === 'pending_verification'
                        ? 'bg-destructive'
                        : 'bg-chart-4'
                }`}
            >
                {row.original.status === 'pending_verification' && (
                    <Loader className="h-4 w-4 text-secondary-foreground" />
                )}
                {row.original.status}
            </Badge>
        ),
    },
    {
        id: 'instagramUrl',
        accessorKey: 'instagramUrl',
        header: 'Instagram',
        cell: ({ row }) => (
            <a
                href={row.original.instagramUrl || ''}
                className="truncate hover:underline flex gap-2  items-center"
            >
                <LinkIcon className="w-4 h-4" /> Instagram
            </a>
        ),
    },

    {
        id: 'createdAt',
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => formatDate(row.original.createdAt || ''),
    },
    {
        id: 'bio',
        accessorKey: 'bio',
        header: 'Bio',
        cell: ({ row }) => {
            const bio = row.original.bio || '—';

            if (bio.length < 50) {
                return <span className="truncate ">{bio}</span>;
            }

            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-auto justify-start text-left text-sm p-2"
                        >
                            <p className="text-sm flex items-center gap-2">
                                {bio.length > 50 ? bio.slice(0, 30) + '...' : bio}
                                <ChevronDown size={16} />
                            </p>
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className=" p-4" align="start">
                        <ScrollArea className="max-h-[60vh]">
                            <p className="whitespace-pre-wrap text-sm">{bio}</p>
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
            );
        },
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

                        <DropdownMenuItem className="text-destructive" asChild>
                            <DeleteUser
                                id={user.id!}
                                onSuccess={() => toast.success('User deleted')}
                                trigger={
                                    <Button className="text-destructive w-full" variant={'ghost'}>
                                        Delete
                                    </Button>
                                }
                            />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
