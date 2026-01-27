import type { NextConfig } from "next";
import "./src/env";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: ["images.unsplash.com"],
	},
};

export default nextConfig;
