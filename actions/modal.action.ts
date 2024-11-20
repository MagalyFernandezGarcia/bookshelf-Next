"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const showReclaimModal = () => {
	noStore();
	console.log("showReclaimModal");

	const cookieStore = cookies();
	cookieStore.delete("modalDismissedAt");

	revalidatePath("/bookshelf");
};

export const hideReclaimModal = () => {
	noStore();
	console.log("hideReclaimModal");

	const cookieStore = cookies();
	cookieStore.set("modalDismissedAt", new Date().toDateString());

	revalidatePath("/bookshelf");
	redirect("/bookshelf");
};

export const getVisibilityReclaimModal = () => {
	noStore();
	console.log("getVisibilityReclaimModal 1");

	const cookieStore = cookies();
	const modalDismissedAt = cookieStore.get("modalDismissedAt");

	if (!modalDismissedAt) return true;

	const today = new Date().toDateString();
	const isModalDismissed =
		new Date(modalDismissedAt.value).toDateString() !== today;

	console.log("getVisibilityReclaimModal 2", isModalDismissed);
	return isModalDismissed;
};
