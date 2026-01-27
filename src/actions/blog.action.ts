"use server";

import { blogService } from "@/service/blog.service";
import { BlogData } from "@/types/blog.types";
import { updateTag } from "next/cache";

export const getBlogs = async () => {
	return await blogService.getBlogPosts();
};

export const createBlogPost = async (blogData: BlogData) => {
	updateTag("blogPosts");
	return await blogService.createBlogPost(blogData);
};
