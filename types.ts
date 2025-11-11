import { ReactNode } from "react";

export type Language = 'ar' | 'fr';

export type NavigationItem = 'unites' | 'dashboard' | 'profile' | 'studentDashboard' | 'gradeSheet';

export interface Translations {
  [key: string]: any;
}

export type Role = 'student' | 'professor';

export interface Student {
  id: string; // e.g., "2APIC-1-15"
  firstName: string;
  lastName: string;
  class: string;
  number: number;
  password: string;
}

export interface User {
  id: string;
  role: Role;
  firstName?: string;
  lastName?: string;
  class?: string;
  number?: number;
}


export interface DragOptions {
  draggables: { id: string; label: string }[];
  droppables: { id: string; label: string }[];
}

export interface Question {
  id: number;
  type: 'vrai_faux' | 'multiple_choice' | 'multiple_choice_multiple' | 'drag_drop' | 'situation_problem';
  question: string;
  answer: string | boolean | string[] | { [key: string]: string };
  options?: string[];
  dragOptions?: DragOptions;
  explanation?: string;
}

export interface SubUnit {
  id: string;
  title: string;
  content: ReactNode;
  questions?: Question[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  subUnits: SubUnit[];
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface AnswerDetail {
  questionId: number;
  questionText: string;
  userAnswer: any;
  correctAnswer: any;
  isCorrect: boolean;
  pointsEarned: number;
  totalPoints: number;
}

export interface ExamResult {
  examId: string;
  examTitle: string;
  score: number;
  timestamp: number;
  attempt: number;
  duration: number; // in seconds
  answers: AnswerDetail[];
}