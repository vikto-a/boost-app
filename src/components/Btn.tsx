import type { IconType } from 'react-icons';
import Link from 'next/link';
import React from 'react';

type Props = {
	children: string;
	icon: IconType;
	to: string;
};

export const Btn: React.FC<Props> = ({ to, children, icon }) => {
	return (
		<Link
			href={to}
			className="flex items-center gap-1 rounded-md border border-purple-400 bg-black px-6 py-3 text-center text-purple-400 transition hover:bg-neutral-900"
		>
			<span className="flex-1">{children}</span>
			{React.createElement(icon, { size: 20 })}
		</Link>
	);
};
