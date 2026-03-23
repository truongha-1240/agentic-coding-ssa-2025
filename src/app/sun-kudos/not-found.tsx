import Link from "next/link";

export default function SunKudosNotFound() {
	return (
		<div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center px-6">
			<div className="text-center max-w-md">
				<h2 className="text-4xl font-bold text-[var(--color-text-gold)] mb-4">
					404
				</h2>
				<p className="text-white/60 mb-6">
					Trang bạn tìm kiếm không tồn tại.
				</p>
				<Link
					href="/sun-kudos"
					className="px-6 py-3 border border-[var(--color-border-gold)] bg-[var(--color-btn-secondary-bg)] text-white font-bold rounded-lg hover:bg-[var(--color-btn-login-hover)] hover:text-[var(--color-btn-login-text)] transition-colors duration-150 inline-block"
				>
					Về trang Sun* Kudos
				</Link>
			</div>
		</div>
	);
}
