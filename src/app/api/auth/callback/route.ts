import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/";

	if (!code) {
		return NextResponse.redirect(new URL("/login", origin));
	}

	const supabase = await createClient();
	const { error } = await supabase.auth.exchangeCodeForSession(code);

	if (error) {
		const loginUrl = new URL("/login", origin);
		loginUrl.searchParams.set("error", "auth_error");
		loginUrl.searchParams.set(
			"error_description",
			error.message
		);
		return NextResponse.redirect(loginUrl);
	}

	const redirectTo = next.startsWith("/") && !next.startsWith("//") ? next : "/";
	return NextResponse.redirect(new URL(redirectTo, origin));
}
