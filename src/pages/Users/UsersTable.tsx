import React from 'react';
import { columns } from './Columns';
import { DataTable } from '../DataTable';
import { useUsersQuery } from '@/features/users/userApi';
export default function UsersTable({
    searchQuery,
    sortQuery,
    sortOrder,
}: {
    searchQuery: string;
    sortQuery: string;
    sortOrder: string;
}) {
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data, isLoading } = useUsersQuery(
        {
            page: pagination.pageIndex + 1, // API expects 1-based
            limit: pagination.pageSize,
            search: searchQuery,
            sortBy: sortQuery,
            sortOrder,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    const totalPages = data?.meta?.pagination?.totalPages ?? 0;
    const totalRows = data?.meta?.pagination?.total ?? 0;

    return (
        <div className="overflow-hidden rounded-md border">
            <DataTable
                columns={columns}
                data={data?.data ?? []}
                totalRows={totalRows}
                totalPages={totalPages}
                pagination={pagination}
                onPaginationChange={setPagination}
                isLoading={isLoading}
            />
        </div>
    );
}
