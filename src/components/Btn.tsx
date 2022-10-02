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
			className="flex items-center gap-3 rounded-md bg-purple-400 px-6 py-3 text-black shadow-xl shadow-purple-400"
		>
			<span className="font-bold">{children}</span>
			{React.createElement(icon, { size: 30 })}
		</Link>
	);
};
