import { Color } from '@type';
import type { IconType } from 'react-icons';
import React from 'react';

type Props = {
	quantity: string;
	name: string;
	color: Color;
	icon: IconType;
};

export const Exercise: React.FC<Props> = ({ quantity, name, color, icon }) => {
	let borderColor = '';
	let iconColor = '';

	switch (color) {
		case Color.Green:
			borderColor = 'border-l-green-400';
			iconColor = 'text-green-400';
			break;
		case Color.Red:
			borderColor = 'border-l-red-400';
			iconColor = 'text-red-400';
			break;
		case Color.Blue:
			borderColor = 'border-l-blue-400';
			iconColor = 'text-blue-400';
			break;
		case Color.Yellow:
			borderColor = 'border-l-yellow-400';
			iconColor = 'text-yellow-400';
			break;
	}

	return (
		<div
			className={`z-30 flex w-56 items-center space-x-6 rounded-md border-l-8 bg-neutral-900 py-3 px-6 odd:ml-12 even:mr-12 ${borderColor}`}
		>
			<div className={`${iconColor}`}>
				{React.createElement(icon, { size: 30 })}
			</div>
			<div>
				<h2 className="text-lg font-bold">{quantity}</h2>
				<h3 className="text-sm text-neutral-400">{name}</h3>
			</div>
		</div>
	);
};
