"use client"

import Image from "next/image";
import trash from "@/images/trash.svg";
import { deleteBook } from "@/app/db.service";
import { useRouter } from 'next/navigation'


const DeleteBtn = ({ sizeIcon ,id }: { sizeIcon: number, id: number }) => {
  const router=useRouter()
    const handleDelete = async () => {
        try {
            await deleteBook(id);
            console.log("Book deleted successfully");
            
          } catch (error) {
            console.error("Failed to delete book:", error);
            console.log(error);
          }
          router.push('/bookshelf')
        }



  return <button ><Image src={trash} alt="trash" width={sizeIcon} height={sizeIcon} onClick={handleDelete} /></button>
};

export default DeleteBtn;
