import { getFullBook } from "@/app/db.service";

import FormUpdate from "@/components/FormUpdate";

interface BookPageProps {
    params: { id: string }; 
  }

const updatePage = async ({ params }: BookPageProps) => {
    const { id } = params;
    
    
    const currentBook = await getFullBook(parseInt(id));
  



  //vérifie que currentBook n'est pas undefined
    if(currentBook) {
        return <FormUpdate currentBook={currentBook}  />
    }

   return <div>404</div>
    
};

export default updatePage