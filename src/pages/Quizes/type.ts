// Represents a single question within a quiz
interface Question {
    id: string;
    quizId: string;
    question: string;
    sortOrder: number;
    points: number;
    options: string[];
    correctAnswer: number;
    explanation: string;
    createdAt: string;
    updatedAt: string;
}

// Represents a single quiz object, including its questions
interface Quiz {
    id: string;
    courseId: string;
    title: string;
    description: string;
    timeLimitMinutes: number;
    maxAttempts: number;
    passPercentage: number;
    randomizeQuestions: boolean;
    showCorrectAnswersAfterAttempt: boolean;
    isPublished: boolean;
    questionsCount: number;
    createdAt: string;
    updatedAt: string;
    questions: Question[];
}

export type { Question, Quiz };
