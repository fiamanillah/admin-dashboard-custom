import React from 'react';
import { DataTable } from '../DataTable';
import { useGetQuizzesQuery } from '@/features/quize/quizeApi';
import { columns } from './Columns';
import { useParams } from 'react-router';

// Define the props for the component
interface QuizzesTableProps {
    searchQuery: string;
    sortQuery: string;
    sortOrder: 'asc' | 'desc';
}

export default function QuizesTable({ searchQuery, sortQuery, sortOrder }: QuizzesTableProps) {
    // State to manage pagination for the data table
    const { courseId } = useParams();
    const [pagination, setPagination] = React.useState({
        pageIndex: 0, // Current page index (0-based)
        pageSize: 10, // Number of rows per page
    });

    // Fetch quiz data using the RTK Query hook
    const { data, isLoading } = useGetQuizzesQuery(
        {
            page: pagination.pageIndex + 1, // API expects 1-based page number
            limit: pagination.pageSize,
            courseId,
            searchTerm: searchQuery, // Using 'searchTerm' as defined in the API slice
            sortBy: sortQuery,
            sortOrder,
        },
        {
            // This ensures data is refetched if query args change or the component remounts
            refetchOnMountOrArgChange: true,
        }
    );

    // Safely access pagination details from the API response
    const totalPages = data?.meta?.pagination?.totalPages ?? 0;
    const totalRows = data?.meta?.pagination?.total ?? 0;

    return (
        <div className="overflow-hidden rounded-md border">
            <DataTable
                // You'll need to define the 'columns' for the quizzes table
                columns={columns}
                // Provide the quiz data array, defaulting to an empty array
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
