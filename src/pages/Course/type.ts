import { z } from 'zod';

export const CourseSchema = z.object({
    id: z.uuid(),
    title: z.string(),
    slug: z.string(),
    subtitle: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    shortDescription: z.string().nullable().optional(),
    thumbnailUrl: z.url().nullable().optional(),
    previewVideoUrl: z.url().nullable().optional(),
    difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    estimatedDurationHours: z.number().nullable().optional(),
    basePrice: z.number().default(0),
    discount: z.number().nullable().optional().default(0),
    discountedPrice: z.number().nullable().optional().default(0),
    hasFinalQuiz: z.boolean().default(false),
    passPercentage: z.number().default(70),
    hasCertificate: z.boolean().default(false),
    isPublished: z.boolean().default(false),
    publishedAt: z.date().nullable().optional(),
    isDeleted: z.boolean().default(false),
    deletedAt: z.date().nullable().optional(),
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date()),
    // relations as arrays or objects
    enrollments: z.array(z.any()).optional(),
    coursePlans: z.array(z.any()).optional(),
    modules: z.array(z.any()).optional(),
    transactions: z.array(z.any()).optional(),
    quiz: z.any().nullable().optional(),
    certificates: z.array(z.any()).optional(),
    courseReviews: z.array(z.any()).optional(),
});

export type TCourse = z.infer<typeof CourseSchema>;
