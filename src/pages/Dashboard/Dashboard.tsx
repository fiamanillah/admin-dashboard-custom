import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';
import { useProfileQuery } from '@/features/auth/authApi';
import data from './data.json';
export default function Dashboard() {
    // Fetch profile data
    const {
        data: profileData,
        isLoading,
        isError,
        error,
    } = useProfileQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    if (isLoading) return <div>Loading profile...</div>;
    if (isError) return <div>Error loading profile: {JSON.stringify(error)}</div>;

    const profile = profileData?.data;
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {profile ? (
                <div className="space-y-2">
                    <p>
                        <strong>Full Name:</strong>{' '}
                        {profile.displayName || `${profile.firstName} ${profile.lastName}`}
                    </p>
                    <p>
                        <strong>Email:</strong> {profile.email}
                    </p>
                    <p>
                        <strong>Username:</strong> {profile.username || 'N/A'}
                    </p>
                    <p>
                        <strong>Role:</strong> {profile.role}
                    </p>
                    <p>
                        <strong>Status:</strong> {profile.status}
                    </p>
                    <p>
                        <strong>Last Login:</strong>{' '}
                        {new Date(profile.lastLoginAt).toLocaleString()}
                    </p>
                    <p>
                        <strong>Bio:</strong> {profile.bio || 'No bio provided'}
                    </p>
                    <p>
                        <strong>Created At:</strong> {new Date(profile.createdAt).toLocaleString()}
                    </p>
                    {profile.avatarUrl && (
                        <img
                            src={profile.avatarUrl}
                            alt="Avatar"
                            className="w-24 h-24 rounded-full mt-2"
                        />
                    )}
                </div>
            ) : (
                <p>No profile data found.</p>
            )}
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="px-4 lg:px-6 border w-[250px] h-[200px] bg-accent border-amber-300 clip-path-curve rounded-xl">
                        Dashboard content
                    </div>
                    <SectionCards />
                    <div className="px-4 lg:px-6">
                        <ChartAreaInteractive />
                    </div>
                    <DataTable data={data} />
                </div>
            </div>
        </div>
    );
}
