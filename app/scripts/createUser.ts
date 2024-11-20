import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({
		data: {
			email: "fernandezgarciamagaly@gmail.com",
			password: "test",
			name: "Magaly",
		},
	});

	console.log("User created:", user);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
