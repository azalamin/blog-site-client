import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";

export default async function RootLayout() {
	const cookiesStore = await cookies();
	// console.log(cookiesStore.toString());
	const res = await fetch("http://localhost:4000/api/auth/get-session", {
		headers: {
			Cookie: cookiesStore.toString(),
		},
		cache: "no-store",
	});
	const session = await res.json();
	console.log(session);
	return (
		<div>
			<Button variant='outline'>Click Here</Button>
		</div>
	);
}
