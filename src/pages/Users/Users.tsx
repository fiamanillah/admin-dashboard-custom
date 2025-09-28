import { useUsersQuery } from '@/features/users/userApi';
import UsersTable from './UsersTable';
import { columns } from './columns';

export default function Users() {
    const { data } = useUsersQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    console.log(data);

    return (
        <div className="p-2">
            <UsersTable data={data?.data || []} columns={columns} />
        </div>
    );
}
