import { choice } from "./choice";

export interface question {
  title: string
  id: number;
  text: string;
  choices: choice[];
}