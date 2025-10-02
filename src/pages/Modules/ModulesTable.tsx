import { useGetModulesQuery } from '@/features/modules/modulesApi';

export default function ModulesTable({ courseId }: { courseId: string }) {
    const { data } = useGetModulesQuery(
        {
            courseId,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    console.log(data);
    return <div></div>;
}
