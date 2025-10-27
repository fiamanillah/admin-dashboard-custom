import type { TCourse } from '../Course/type';
import { z } from 'zod';
export type TCoursePlan = {
    id: string;
    courseId: string;
    title: string;
    slug: string;
    description?: string | null;
    features: string[];
    basePrice: string; // Decimal fields are represented as string in Prisma TS output
    discount?: string | null;
    discountedPrice?: string | null;
    accessDurationDays?: number | null;
    contentAccess?: string | null;
    includesCertificate: boolean;
    certificateType?: string | null;
    includesCommunityAccess: boolean;
    includesFutureUpdates: boolean;
    affiliateCommissionRate: string;
    affiliateEnabled: boolean;
    isActive: boolean;
    isRecommended: boolean;
    createdAt: Date;
    updatedAt: Date;

    // Relations
    course: TCourse;
    // transactions: Transaction[];
    // enrollments: Enrollment[];
};

const coursePlanSchema = z.object({
    id: z.string().optional(),
    courseId: z.string().optional(),
    title: z.string().nonempty('Title is required'),
    description: z.string().nonempty('Description is required'),
    features: z.array(z.string()).min(1, 'At least one feature is required'),
    basePrice: z.number().positive('Base price must be a positive number'),
    discount: z
        .number()
        .min(0, 'Discount cannot be negative')
        .max(100, 'Discount cannot exceed 100'),
    accessDurationDays: z.number().min(1, 'Access duration must be at least 1 day'),
    contentAccess: z.enum(['Full', 'Partial']),
    includesCertificate: z.boolean(),
    certificateType: z.enum(['Completion', 'Certificate of Achievement', 'None']),
    includesCommunityAccess: z.boolean(),
    includesFutureUpdates: z.boolean(),
    affiliateCommissionRate: z
        .number()
        .min(0, 'Commission rate cannot be negative')
        .max(100, 'Commission rate cannot exceed 100'),
    affiliateEnabled: z.boolean(),
    isActive: z.boolean(),
    isRecommended: z.boolean(),
});

type TCoursePlanSchema = z.infer<typeof coursePlanSchema>;
export type { TCoursePlanSchema };

export default coursePlanSchema;
