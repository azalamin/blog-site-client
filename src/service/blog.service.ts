import { env } from "@/env";
import { GetBlogsParams } from "@/types";
import { BlogServiceOptions } from "@/types/blog.types";

const API_URL = env.API_URL;

//* NO Dynamic and No {cache: no-store}: SSG --> Static Site Generation (Static Page)
//* {cache: no-store}: SSR --> Server Side Rendering (Dynamic Page)
//* next: { revalidate: 10 } : ISR --> Incremental Static Regeneration (Mix between static and dynamic page)

export const blogService = {
	getBlogPosts: async function (params?: GetBlogsParams, options?: BlogServiceOptions) {
		try {
			const url = new URL(`${API_URL}/posts`);
			if (params) {
				Object.entries(params).forEach(([key, value]) => {
					if (value !== undefined && value !== null && value !== "") {
						url.searchParams.append(key, value);
					}
				});
			}

			const config: RequestInit = {};

			if (options?.cache) {
				config.cache = options.cache;
			}

			if (options?.revalidate) {
				config.next = { revalidate: options.revalidate };
			}

			config.next = { ...config.next, tags: ["blogPosts"] };

			const res = await fetch(url.toString(), config);

			// const res = await fetch(url.toString(), {
			// 	next: {
			// 		tags: ["blogPosts"],
			// 	},
			// });

			const data = await res.json();

			if (!data.success) {
				return { data: null, error: { message: data.message ?? "Failed" } };
			}

			return { data: data?.data, error: null };
		} catch (err) {
			return { data: null, error: { message: "Something went wrong!" } };
		}
	},
	getBlogPostById: async function (id: string) {
		try {
			const res = await fetch(`${API_URL}/posts/${id}`);
			const data = await res.json();
			if (data.success) {
				return { data: data.data, error: null };
			}
		} catch (error) {
			return { data: null, error: { message: "Something went wrong!" } };
		}
	},
};
