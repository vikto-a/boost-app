import { Color } from '@type';
import type { IconType } from 'react-icons';
import React from 'react';

type Props = {
	quantity: string;
	name: string;
	color: Color;
	icon: IconType;
	active?: boolean;
};

export const Event: React.FC<Props> = ({
	active,
	quantity,
	name,
	color,
	icon,
}) => {
	let borderColor = '';
	let iconColor = '';
	let shadowColor = '';

	switch (color) {
		case Color.Green:
			borderColor = 'border-l-green-400';
			iconColor = 'text-green-400';
			shadowColor = 'shadow-green-500';
			break;
		case Color.Red:
			borderColor = 'border-l-red-400';
			iconColor = 'text-red-400';
			shadowColor = 'shadow-red-500';
			break;
		case Color.Blue:
			borderColor = 'border-l-blue-400';
			iconColor = 'text-blue-400';
			shadowColor = 'shadow-blue-500';
			break;
		case Color.Yellow:
			borderColor = 'border-l-yellow-400';
			iconColor = 'text-yellow-400';
			shadowColor = 'shadow-yellow-500';
			break;
	}

	return (
		<div
			className={`z-30 flex w-full items-center space-x-6 rounded-md border-l-8 bg-neutral-900 py-3 px-6 shadow-2xl ${
				active ? borderColor : 'border-neutral-800'
			} ${active && shadowColor}`}
		>
			<div className={`${active ? iconColor : 'text-neutral-800'}`}>
				{React.createElement(icon, { size: 30 })}
			</div>
			<div className={!active ? 'text-neutral-400' : ''}>
				<h2 className="text-lg font-bold">{quantity}</h2>
				<h3
					className={`text-sm ${
						!active ? 'text-neutral-400' : 'text-neutral-400'
					}`}
				>
					{name}
				</h3>
			</div>
		</div>
	);
};
