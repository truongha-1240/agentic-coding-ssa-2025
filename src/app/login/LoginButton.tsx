"use client";

import { GoogleIcon } from "@/components/icons/GoogleIcon";

interface LoginButtonProps {
	error: string | null;
	redirectTo: string;
	isLoading: boolean;
	onLogin: () => void;
	onClearError: () => void;
}

export function LoginButton({
	error,
	isLoading,
	onLogin,
	onClearError,
}: LoginButtonProps) {
	function handleClick() {
		if (error) {
			onClearError();
		}
		onLogin();
	}

	return (
		<div>
			<button
				type="button"
				aria-label="Login with Google"
				disabled={isLoading}
				onClick={handleClick}
				className={`
					flex items-center gap-2 px-6 py-4 bg-[#FFEA9E] rounded-lg w-full max-w-[305px]
					font-bold text-[22px] leading-7 text-[#00101A] font-[family-name:var(--font-montserrat)]
					cursor-pointer transition-all duration-150 ease-in-out
					hover:bg-[#FFE070] hover:shadow-[0_4px_12px_rgba(255,234,158,0.3)] hover:-translate-y-px
					focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2
					active:bg-[#FFD740] active:translate-y-0
					disabled:opacity-50 disabled:cursor-not-allowed
					${isLoading ? "pointer-events-none opacity-70" : ""}
				`}
			>
				{isLoading ? (
					<>
						<span className="inline-block w-4 h-4 border-2 border-[#00101A] border-t-transparent rounded-full animate-spin" />
						<span>Logging in...</span>
					</>
				) : (
					<>
						<span>LOGIN With Google</span>
						<GoogleIcon className="w-6 h-6" />
					</>
				)}
			</button>
			{error && (
				<p
					role="alert"
					className="mt-3 text-sm font-medium leading-5 text-[#EF4444] max-w-[305px] font-[family-name:var(--font-montserrat)] animate-[fadeIn_200ms_ease-in]"
				>
					{error}
				</p>
			)}
		</div>
	);
}
