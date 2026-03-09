import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { LoginClient } from "@/app/login/LoginClient";
import LoginLoading from "@/app/login/loading";

export default async function LoginPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		redirect("/");
	}

	return (
		<Suspense fallback={<LoginLoading />}>
			<LoginClient />
		</Suspense>
	);
}
