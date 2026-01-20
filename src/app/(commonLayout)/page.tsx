import { Button } from "@/components/ui/button";
import { blogService } from "@/service/blog.service";

export default async function HomePage() {
	const data = await blogService.getBlogPosts();

	console.log(data);

	return (
		<div>
			<Button variant='outline'>Click Here</Button>
		</div>
	);
}
