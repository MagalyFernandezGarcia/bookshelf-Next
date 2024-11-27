import { z } from "zod";

const parseLocalizedDate = (dateString: string) => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

type CommonBook = {
  //tronc commun aux autres types
  title: string;
  volume: number;
  resume: string;
  returned: boolean;
  format: string;
  rating: number;
};

export type Book = CommonBook & {
  // type pour récupérer le livre de la db
  id: number;
  authorId: string;
  genreId: string;
  borrower: string | null;
  date: Date | null;
  serie: string | null;
};

export type BookData = CommonBook & {
  // type pour envoyer le formulaire à la db

  author: string;
  genre: string;
  borrower?: string;
  date?: string;
  serie: string;
};

export const BookSchema = z
  .object({
    // schema zod pour envoyer le formulaire à la db
    title: z.string().min(1).max(60), // le min(1) signifie qu'il doit y avoir au moins un caractère
    volume: z.coerce
      .number({ invalid_type_error: "Volume must be a number" })
      .min(1),
    serie: z.string().optional(),
    author: z.string().min(1),
    genre: z.string().min(1),
    resume: z.string().min(1),
    rating: z.coerce.number().min(1), //le coerce signifie que l'opinion doit être un nombre
    returned: z.boolean(),
    format: z.string().min(1),
    borrower: z.string().optional(),
    date: z
      .string()
      .optional()
      .transform((date) => (date ? new Date(date).toISOString() : undefined)), //transforme le string en date
  })
  .strict() // le strict signifie que les types doivent être strictement identiques
  .transform((data) => {
    if (data.format === "kindle") {
      return {
        ...data,
        borrower: "",
        date: undefined,
      };
    }
  });

export type CreateBook = z.infer<typeof BookSchema>; //type qui utilise le schema zod
