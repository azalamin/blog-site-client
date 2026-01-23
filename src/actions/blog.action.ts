"use server";

import { blogService } from "@/service/blog.service";

export const getBlogs = async () => {
	return await blogService.getBlogPosts();
};
