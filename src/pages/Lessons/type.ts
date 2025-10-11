import type { TModule } from '../Modules/type';

export type TLesson = {
    id: string; // UUID as a string
    moduleId: string; // UUID as a string
    module: TModule; // The associated Module
    title: string;
    description?: string | null; // `description` is optional and can be null
    contentType: string; // Assuming ContentType is an enum or type
    contentData: JSON; // Flexible content data as JSON, can be any valid JSON data
    isPublished: boolean;
    isPreview: boolean;
    requiredPlanLevel: number; // Defaulted to 1
    estimatedDurationMinutes?: number | null; // Optional, can be null
    createdAt: Date;
    updatedAt: Date;
    // lessoonProgresses: LessonProgress[]; // Assuming `LessonProgress` is the type for LessonProgress model
    // LessonNote: LessonNote[]; // Assuming `LessonNote` is the type for LessonNote model
};
