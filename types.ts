
export type ActivityType = 'flashcard' | 'question' | 'scenario';

export interface Activity {
  type: ActivityType;
  question: string;
  answer?: string; // For flashcards
  options?: string[]; // For MCQ/Scenario
  correctAnswer?: string;
  explanation?: string;
}

export interface Lesson {
  id: number;
  title: string;
  orderRef: string;
  summary: string;
  activities: Activity[];
}

export interface Unit {
  id: number;
  title: string;
  lessons: Lesson[];
  flashcards: Activity[];
  quiz: Activity[];
}

export interface PracticeExam {
  id: number;
  title: string;
  questions: Activity[];
}

export interface DocumentSection {
  header: string;
  paragraphs: string[];
}

export interface DepartmentOrder {
  id: string;
  title: string;
  category: 'General' | 'Special' | 'Notice' | 'Resource' | 'Training' | 'Statute';
  effectiveDate: string;
  pages: string[]; // Still keep for potential real images
  contentSections?: DocumentSection[][]; // Array of pages, each page is an array of sections
}
