export interface user {
    id: number;
    name: string;
    surname: string;
    email: string;
    role: 'coordinator' | 'respondent';
    password: string;
}