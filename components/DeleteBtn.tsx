"use client"

import Image from "next/image";
import trash from "@/images/trash.svg";
import { deleteBook } from "@/app/db.service";

const DeleteBtn = ({ sizeIcon ,id }: { sizeIcon: number, id: number }) => {
    const handleDelete = async () => {
        try {
            await deleteBook(id);
            console.log("Book deleted successfully");
            
          } catch (error) {
            console.error("Failed to delete book:", error);
            console.log(error);
          }
    }



  return <button ><Image src={trash} alt="trash" width={sizeIcon} height={sizeIcon} onClick={handleDelete} /></button>
};

export default DeleteBtn;
