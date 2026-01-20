import { Button } from "@/components/ui/button";
import { userService } from "@/service/user.service";

export default async function HomePage() {
	const { data } = await userService.getSession();

	return (
		<div>
			<Button variant='outline'>Click Here</Button>
		</div>
	);
}
