import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
	to: string;
	children: string;
};

export const NavLink: React.FC<Props> = ({ to, children }) => {
	const router = useRouter();

	const active = router.pathname === to;

	return (
		<Link
			href={to}
			className={`px-6 py-3 transition ${
				active ? 'font-bold' : 'hover:text-neutral-800'
			}`}
		>
			{children}
		</Link>
	);
};
