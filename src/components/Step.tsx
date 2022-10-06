import { Card } from './Card';
import { Color } from '@type';
import type { IconType } from 'react-icons';
import React from 'react';

type Props = {
	quantity: string;
	name: string;
	color: Color;
	icon: IconType;
};

export const Step: React.FC<Props> = ({ quantity, name, color, icon }) => {
	return (
		<div className="z-30 w-56 odd:ml-12 even:mr-12 md:odd:mr-44 md:even:ml-44">
			<Card icon={icon} color={color}>
				<h2 className="text-lg font-bold text-white">{quantity}</h2>
				<h3 className="text-sm text-neutral-400">{name}</h3>
			</Card>
		</div>
	);
};
