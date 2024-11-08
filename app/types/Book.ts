import { date, z } from "zod";

const parseLocalizedDate = (dateString: string) => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day); 
};

type CommonBook = { //tronc commun aux autres types
  title: string;
  volume: number;
  serie: string;
  authorId: number;
  genreId: number;
  resume: string;
  type: string;
  returned: boolean;
  format: string;
  borrower?: string;
  date?: Date;
};

export type Book = CommonBook & { // type pour récupérer le livre de la db
  id: number;
  rating: number;
  authorId: number;
  genreId: number;
};



export const BookSchema = z.object({ // schema zod pour envoyer le formulaire à la db
  title: z.string().min(1), // le min(1) signifie qu'il doit y avoir au moins un caractère
  volume: z.coerce.number().min(1),
  serie: z.string().optional(),
  author: z.string().min(1),
  genre: z.string().min(1),
  resume: z.string().min(1),
  rating: z.coerce.number().min(1), //le coerce signifie que l'opinion doit être un nombre
  returned: z.boolean(),
  format: z.string().min(1),
  borrower: z.string().optional(),
  date: z.string().optional().transform((date) => date ? new Date(date).toISOString() : undefined) //transforme le string en date
}).strict(); // le strict signifie que les types doivent être strictement identiques

export type CreateBook = z.infer<typeof BookSchema>; //type qui utilise le schema zod 