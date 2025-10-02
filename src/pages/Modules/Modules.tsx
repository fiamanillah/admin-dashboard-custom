import { useParams } from 'react-router';
import ModulesTable from './ModulesTable';

export default function Modules() {
    const { courseId } = useParams();
    return (
        <div>
            <h1>Modules</h1>
            {<p>Course ID: {courseId}</p>}
            <ModulesTable courseId={courseId || ''} />
        </div>
    );
}
