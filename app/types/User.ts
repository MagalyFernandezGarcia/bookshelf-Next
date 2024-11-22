import { z } from "zod"

export type NewUser ={
    name: string
    password: string
    mail: string
}

export type User = NewUser & {
    id: number
    
}
export type UserRegistration ={
    password: string,
    mail: string
}

export const AuthorSchema = z.object({ 
  name: z.string().min(1), 
}).strict(); 

export type CreateAuthor = z.infer<typeof AuthorSchema>;