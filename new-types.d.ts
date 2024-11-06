declare namespace NodeJS {
	interface ProcessEnv {
		POSTGRES_DB: string;
		POSTGRES_USER: string;
		POSTGRES_PASSWORD: string;
		POSTGRES_HOST: string;
	}
}
