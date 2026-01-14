"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function AboutError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, []);
	return (
		<div>
			<h1>Something went wrong! Please try again</h1>
			<Button onClick={() => reset()}>Retry</Button>
		</div>
	);
}
