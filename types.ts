import { ReactNode } from "react";

export type Language = 'ar' | 'fr';

export type NavigationItem = 'unites' | 'dashboard';

export interface Translations {
  [key: string]: any;
}

export interface StudentData {
  name: string;
  lessonsCompleted: number;
  averageScore: number;
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