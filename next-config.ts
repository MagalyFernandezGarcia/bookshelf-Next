import { NextConfig } from "next";

const nextConfig: NextConfig = {
	webpack: (config) => {
		config.module.exprContextCritical = false; // Ignore les avertissements
		config.resolve.alias["pg-native"] = false; // Ignore 'pg-native'

		return config;
	},
};

export default nextConfig;
