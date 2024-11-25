"use client";

import Image from "next/image";
import trash from "@/images/trash.svg";
import { deleteBook } from "@/app/db.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../Modals/Modal";
import DeleteModal from "../Modals/DeleteModal";

const DeleteBtn = ({ sizeIcon, id }: { sizeIcon: number; id: number }) => {
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const handleDelete = async () => {
		setShowModal(false);
		try {
			await deleteBook(id);
			console.log("Book deleted successfully");
		} catch (error) {
			console.error("Failed to delete book:", error);
			console.log(error);
		}
		router.push("/bookshelf");
	};
	const handleModal = () => {
		setShowModal(true);
	};
	const handelAbort = () => {
		setShowModal(false);
	};

	if (showModal) {
		return <DeleteModal onSetModal={handleDelete} onAbort={handelAbort} />;
	} else {
		return (
			<button>
				<Image
					src={trash}
					alt="trash"
					width={sizeIcon}
					height={sizeIcon}
					onClick={handleModal}
					className="lg:w-full lg:h-auto"
				/>
			</button>
		);
	}
};

export default DeleteBtn;
