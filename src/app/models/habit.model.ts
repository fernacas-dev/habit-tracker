import { Models } from "appwrite";

export interface Habit {
  $id?: string,
  dates: string[];
  description: string;
  name: string;
  user_id: string;
}



export interface HabitHeatmap extends Models.Document {
  dates: any[][];
  description: string;
  name: string;
  user_id: string;
}
