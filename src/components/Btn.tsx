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
			className="flex items-center gap-3 rounded-md bg-purple-400 px-6 py-3 text-black shadow-2xl shadow-purple-500 transition hover:bg-purple-300"
		>
			<span className="flex-1 font-bold">{children}</span>
			{React.createElement(icon, { size: 20 })}
		</Link>
	);
};
