import CreateBlogFormClient from "@/components/modules/user/createBlog/CreateBlogFormClient";

export default async function CreateBlogUser() {
	return (
		<div className='h-full flex flex-col justify-center'>
			{/* <CreateBlogFormServer /> */}
			<CreateBlogFormClient />
		</div>
	);
}
