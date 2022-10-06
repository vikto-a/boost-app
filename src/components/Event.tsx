import { Card } from './Card';
import { Color } from '@type';
import { DateTime } from 'luxon';
import { GiCheckMark } from 'react-icons/gi';
import type { IconType } from 'react-icons';
import React from 'react';
import { Time } from './Time';

type Props = {
	quantity: string;
	name: string;
	color: Color;
	icon: IconType;
	active?: boolean;
	endTime?: DateTime | undefined;
	startTime?: DateTime | undefined;
};

export const Event: React.FC<Props> = ({
	active,
	quantity,
	name,
	color,
	icon,
	startTime,
	endTime,
}) => {
	const diff = endTime?.diff(startTime || DateTime.now(), [
		'hours',
		'minutes',
		'seconds',
		'milliseconds',
	]);

	return (
		<Card color={color} icon={!endTime ? icon : GiCheckMark} mute={!active}>
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-lg font-bold">{quantity}</h2>
					<h3
						className={`text-sm ${
							!active ? 'text-neutral-400' : 'text-neutral-400'
						}`}
					>
						{name}
					</h3>
				</div>

				{diff && <Time duration={diff} />}
			</div>
		</Card>
	);
};
