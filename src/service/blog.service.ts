import { env } from "@/env";

const API_URL = env.API_URL;

//* NO Dynamic and No {cache: no-store}: SSG --> Static Site Generation (Static Page)
//* {cache: no-store}: SSR --> Server Side Rendering (Dynamic Page)
//* next: { revalidate: 10 } : ISR --> Incremental Static Regeneration (Mix between static and dynamic page)

export const blogService = {
	getBlogPosts: async function () {
		try {
			const res = await fetch(`${API_URL}/posts`, {
				next: { revalidate: 10 },
			});

			const data = await res.json();

			if (data.success) {
				return { data: data?.data, error: null };
			}
		} catch (err) {
			return { data: null, error: { message: "Something went wrong!" } };
		}
	},
};
