import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/middleware";

export async function middleware(request: NextRequest) {
	const { supabase, supabaseResponse } = createClient(request);
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const pathname = request.nextUrl.pathname;

	if (!user && pathname !== "/login") {
		const url = request.nextUrl.clone();
		url.pathname = "/login";
		url.searchParams.set("redirectTo", pathname);
		return NextResponse.redirect(url);
	}

	if (user && pathname === "/login") {
		const url = request.nextUrl.clone();
		url.pathname = "/";
		url.search = "";
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|images|favicon.svg|api/auth/callback).*)",
	],
};
