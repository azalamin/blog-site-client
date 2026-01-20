import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";
import { userService } from "./service/user.service";

export async function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	let isAuthenticated: boolean = false;

	let isAdmin: boolean = false;

	const { data } = await userService.getSession();

	if (data) {
		isAuthenticated = true;
		isAdmin = data.user.role === Roles.admin;
	}

	//* User is not authenticated at all
	if (!isAuthenticated) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	//* User is authenticated but role = ADMIN
	//* User cannot visit user dashboard
	if (isAdmin && pathname.startsWith("/dashboard")) {
		return NextResponse.redirect(new URL("/admin-dashboard", request.url));
	}

	//* User is authenticated but role = USER
	//* User cannot visit admin-dashboard
	if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard", "/dashboard/:path*", "/admin-dashboard", "/admin-dashboard/:path*"],
};
