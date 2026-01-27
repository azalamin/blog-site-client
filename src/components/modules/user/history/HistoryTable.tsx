import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { BlogPost } from "@/types";

export default async function HistoryTable({ posts }: { posts: BlogPost[] }) {
	return (
		<div className='border rounded-md'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Title</TableHead>
						<TableHead>Tags</TableHead>
						<TableHead>View</TableHead>
						<TableHead>Comments</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{posts.map(post => (
						<TableRow key={post.id}>
							<TableCell>{post.title}</TableCell>
							<TableCell className='flex flex-wrap gap-2'>
								{post.tags?.map((item, index) => (
									<Badge key={index} variant='secondary'>
										{item}
									</Badge>
								))}
							</TableCell>
							<TableCell>{post.views}</TableCell>
							<TableCell>{post._count?.comments}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
