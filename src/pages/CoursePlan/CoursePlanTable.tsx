import React from 'react';
import { columns } from './Columns';
import { DataTable } from '../DataTable';
import { useGetCoursePlansQuery } from '@/features/coursePlan/coursePlanApi';
import { useParams } from 'react-router';

export function CoursePlanTable({
    searchQuery,
    sortQuery,
    sortOrder,
}: {
    searchQuery: string;
    sortQuery: string;
    sortOrder: string;
}) {
    const { courseId } = useParams();
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data, isLoading } = useGetCoursePlansQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: searchQuery,
        sortBy: sortQuery,
        courseId,
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
