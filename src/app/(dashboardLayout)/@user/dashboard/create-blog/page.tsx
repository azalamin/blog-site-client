import CreateBlogFormClient from "@/components/modules/user/createBlog/CreateBlogFormClient";
import { blogService } from "@/service/blog.service";
import { BlogPost } from "@/types";

export default async function CreateBlogUser() {
	const { data } = await blogService.getBlogPosts({}, { cache: "no-store" });

	return (
		<div>
			{/* <CreateBlogFormServer /> */}
			<CreateBlogFormClient />
			{data.allPost.map((item: BlogPost) => (
				<p key={item.id}>{item.title}</p>
			))}
		</div>
	);
}
