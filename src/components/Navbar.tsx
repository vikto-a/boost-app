import Link from 'next/link';

export const Navbar: React.FC = () => {
	return (
		<nav>
			<span>Murph</span>

			<div>
				<Link href="/">Home</Link>
				<Link href="/leaderboard">Leaderboard</Link>
				<Link href="/login">Login</Link>
			</div>
		</nav>
	);
};
