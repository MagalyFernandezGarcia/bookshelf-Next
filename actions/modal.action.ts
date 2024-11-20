"use server";

import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";

export const showReclaimModal = async () => {
	noStore();
	console.log("showReclaimModal");

	const cookieStore = cookies();
	cookieStore.delete("modalDismissedAt");
};

export const hideReclaimModal = async  () => {
	noStore();
	console.log("hideReclaimModal");

	const cookieStore = cookies();
	cookieStore.set("modalDismissedAt", new Date().toDateString());
};

export const getVisibilityReclaimModal = async () => {
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
