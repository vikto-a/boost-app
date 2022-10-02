import Link from 'next/link';

export const Navbar: React.FC = () => {
	return (
		<nav className="sticky top-6 mx-6 flex items-center justify-between rounded-md bg-neutral-900 p-3">
			<span className="font-bold uppercase">Murph</span>

			<div className="flex items-center gap-6">
				<Link href="/">Home</Link>
				<Link href="/leaderboard">Leaderboard</Link>
				<Link href="/login">Login</Link>
			</div>
		</nav>
	);
};
