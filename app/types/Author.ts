import { z } from "zod"

export type NewAuthor ={
    name: string
}

export type Author = {
    id: number
    name: string
    userId: number
}

export const AuthorSchema = z.object({ 
  name: z.string().min(1), 
}).strict(); 

export type CreateAuthor = z.infer<typeof AuthorSchema>;