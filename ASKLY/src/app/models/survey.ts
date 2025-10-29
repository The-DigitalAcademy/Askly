import { question } from "./question";

export interface survey{
    id: number;
    title: string;
    questions: question[];
    isOpen: boolean;
    createdAt: string;
    openedAt?: string;
    closedAt?: string;
}