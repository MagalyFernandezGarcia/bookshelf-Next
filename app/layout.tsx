import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import { raleway } from "./fonts/fonts";



export const metadata: Metadata = {
	title: "Bookshelf",
	description: "an app to keep track of your books",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${raleway.className}  antialiased flex flex-col `}
			>
				<Header title="Bookshelf" />
				<main className=" flex-grow 1 justify-center items-center flex-col mx-8">
					{children}
				</main>
			</body>
		</html>
	);
}
