import type { IconType } from 'react-icons';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

type Props = {
	to: string;
	children: string;
	icon: IconType;
};

export const NavLink: React.FC<Props> = ({ to, children, icon }) => {
	const router = useRouter();

	const active = router.pathname === to;

	return (
		<Link
			href={to}
			className={`flex items-center gap-1.5 px-6 py-3 transition ${
				active
					? 'font-bold text-purple-400'
					: 'text-white hover:text-neutral-300'
			}`}
		>
			{React.createElement(icon, { size: 20 })}
			<span>{children}</span>
		</Link>
	);
};
