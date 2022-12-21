import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333/",
})

export interface TodoReponse {
    id: string;
    title: string;
    category: "studyOrWork" | "hobby" | "commitment";
    description?: string;
    endDate: Date;
    isFinished: boolean;
}[]