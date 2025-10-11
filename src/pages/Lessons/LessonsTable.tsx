import React from 'react';
import { DataTable } from '../DataTable';
import { useParams } from 'react-router';
import { columns } from './Columns';
import { useGetLessonsQuery } from '@/features/lessons/lessonsApi';

export function LessonsTable({
    searchQuery,
    sortQuery,
    sortOrder,
}: {
    searchQuery: string;
    sortQuery: string;
    sortOrder: string;
}) {
    const { moduleId } = useParams();
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data, isLoading } = useGetLessonsQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: searchQuery,
        sortBy: sortQuery,
        moduleId,
        sortOrder,
    });

    const totalRows = data?.meta?.pagination?.total ?? 0;
    const totalPages = data?.meta?.pagination?.totalPages ?? 1;

    return (
        <DataTable
            columns={columns}
            data={data?.data ?? []}
            totalRows={totalRows}
            totalPages={totalPages}
            pagination={pagination}
            onPaginationChange={setPagination}
            isLoading={isLoading}
        />
    );
}
