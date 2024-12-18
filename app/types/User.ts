
import { z } from "zod"

export type NewUser ={
    name: string
    password: string
    email: string
}




export const NewUserSchema = z.object({ 
  name: z.string().min(1), 
  password: z.string().min(1),
  email: z.string().email(),
}).strict(); 


export const UserSchema = z.object({ 
  
  password: z.string().min(1),
  email: z.string().email(),
}).strict();

