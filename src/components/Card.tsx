import { Color } from '@type';
import type { IconType } from 'react-icons';
import React from 'react';
import cn from 'variant-classnames';

type Props = {
	children: React.ReactNode;
	color: Color;
	icon?: IconType;
	mute?: boolean;
	shadow?: boolean;
	border?: 'top' | 'right' | 'bottom' | 'left' | 'none' | 'all';
};

export const Card: React.FC<Props> = ({
	mute = false,
	shadow = true,
	children,
	color,
	icon,
	border = 'all',
}) => {
	const variants = {
		$all: 'flex items-center gap-6 rounded-md bg-black py-3 px-6',
		shadow: {
			true: 'shadow-2xl',
			false: 'shadow-none',
		},
		border: {
			top: 'border-t-8',
			right: 'border-r-8',
			bottom: 'border-b-8',
			left: 'border-l-8',
			none: 'border-none',
			all: 'border',
		},
		color: {
			red: {
				mute: {
					true: 'border-neutral-800 text-neutral-400 shadow-none',
					false: 'border-red-400 text-red-400 shadow-red-500',
				},
			},
			green: {
				mute: {
					true: 'border-neutral-800 text-neutral-400 shadow-none',
					false: 'border-green-400 text-green-400 shadow-green-500',
				},
			},
			yellow: {
				mute: {
					true: 'border-neutral-800 text-neutral-400 shadow-none',
					false: 'border-yellow-400 text-yellow-400 shadow-yellow-500',
				},
			},
			blue: {
				mute: {
					true: 'border-neutral-800 text-neutral-400 shadow-none',
					false: 'border-blue-400 text-blue-400 shadow-blue-500',
				},
			},
			purple: {
				mute: {
					true: 'border-neutral-800 text-neutral-400 shadow-none',
					false: 'border-purple-400 text-purple-400 shadow-purple-500',
				},
			},
		},
	};

	const classes = cn(variants, { color, mute, shadow, border });

	return (
		<div className={classes}>
			{icon && <>{React.createElement(icon, { size: 30 })}</>}
			<div className="flex-1">{children}</div>
		</div>
	);
};
