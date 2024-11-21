import { signIn, signOut, useSession } from "next-auth/react";

const LoginPage = () => {
	const { data: session } = useSession();

	return (
		<div>
			{!session ? (
				<>
					<h1>Login</h1>
					<button onClick={() => signIn("github")}>Sign in with GitHub</button>
				</>
			) : (
				<>
					<h1>Welcome {session.user?.name}</h1>
					<button onClick={() => signOut()}>Sign Out</button>
				</>
			)}
		</div>
	);
};

export default LoginPage;
