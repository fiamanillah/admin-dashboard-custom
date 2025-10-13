import type { TModule } from '../Modules/type';
import { z } from 'zod';

export type TLesson = {
    id: string; // UUID as a string
    moduleId: string; // UUID as a string
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
    module: TModule; // The associated Module
    // lessoonProgresses: LessonProgress[]; // Assuming `LessonProgress` is the type for LessonProgress model
    // LessonNote: LessonNote[]; // Assuming `LessonNote` is the type for LessonNote model
};

export const LessonSchema = z.object({
    id: z.string().uuid().optional(), // UUID as a string
    moduleId: z.string().uuid(), // UUID as a string

    title: z.string(), // Title of the lesson
    description: z.string().optional(), // Optional description
    contentType: z.string(), // Content type (e.g., video, article, etc.)
    contentData: z.any().optional(), // Flexible content data as JSON
    isPublished: z.boolean(),
    isPreview: z.boolean().optional(),
    requiredPlanLevel: z.number().int().min(1).max(10).optional(), // Defaulted to 1
    estimatedDurationMinutes: z.number().optional(),
    // createdAt: z.date(),
    // updatedAt: z.date(),
    // Add any other fields like `lessoonProgresses`, `LessonNote` if needed
});
