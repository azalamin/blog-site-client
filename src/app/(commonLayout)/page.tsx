import BlogCard from "@/components/modules/homepage/BlogCard";
import { Separator } from "@/components/ui/separator";
import { blogService } from "@/service/blog.service";
import { BlogPost } from "@/types";
import Image from "next/image";

export default async function HomePage() {
	const featuredPostsPromise = blogService.getBlogPosts({ isFeatured: true });
	const postsPromise = blogService.getBlogPosts({ limit: "6" }, { revalidate: 10 });

	const [featuredPosts, posts] = await Promise.all([featuredPostsPromise, postsPromise]);

	// console.time("Sequential");
	// await new Promise(resolve => setTimeout(resolve, 3000));
	// await new Promise(resolve => setTimeout(resolve, 3000));
	// await new Promise(resolve => setTimeout(resolve, 3000));
	// console.timeEnd("Sequential");

	// const promise1 = new Promise(resolve => setTimeout(resolve, 3000));
	// const promise2 = await new Promise(resolve => setTimeout(resolve, 3000));

	// await Promise.all([promise1, promise2]);

	return (
		<div className='space-y-24 px-20'>
			<div className='relative'>
				<div className='relative h-[65vh] w-full overflow-hidden rounded-b-3xl'>
					<Image
						src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=100'
						alt='Writing table with tea'
						fill
						priority
						className='object-cover'
					/>
					<div className='absolute inset-0 bg-black/40' />
				</div>

				<div className='absolute inset-0 flex items-center justify-center px-6'>
					<div className='max-w-2xl text-center text-white space-y-4'>
						<h1 className='text-3xl md:text-5xl font-bold leading-tight'>Welcome, take a sip ☕</h1>
						<p className='text-base md:text-lg text-white/90'>
							A quiet place for thoughts, ideas, and stories worth reading.
						</p>
					</div>
				</div>
			</div>

			{featuredPosts.data.allPost.length > 0 && (
				<section className='container space-y-8'>
					<div className='space-y-2'>
						<h2 className='text-2xl font-semibold tracking-tight'>🌟 Featured Posts</h2>
						<p className='text-muted-foreground'>Editor’s picks — start here</p>
					</div>

					<Separator />

					<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
						{featuredPosts.data.allPost.map((post: BlogPost) => (
							<BlogCard key={post.id} post={post} />
						))}
					</div>
				</section>
			)}
			<section className='container space-y-8'>
				<div className='space-y-2'>
					<h2 className='text-2xl font-semibold tracking-tight'>📚 All Posts</h2>
					<p className='text-muted-foreground'>Everything we’ve written so far</p>
				</div>

				<Separator />

				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					{posts.data.allPost.map((post: BlogPost) => (
						<BlogCard key={post.id} post={post} />
					))}
				</div>
			</section>
		</div>
	);
}
