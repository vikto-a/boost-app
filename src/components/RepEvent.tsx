import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Color } from '@type';
import { DateTime } from 'luxon';
import type { IconType } from 'react-icons';
import { IncrementBtn } from '@components';

type Props = {
	quantity: number;
	name: string;
	color: Color;
	icon: IconType;
	active?: boolean;
	endTime?: DateTime | undefined;
	startTime?: DateTime | undefined;
	reps: number;
	setReps: Dispatch<SetStateAction<number>>;
};

export const RepEvent: React.FC<Props> = ({
	active,
	quantity,
	name,
	color,
	icon,
	startTime,
	endTime,
	reps,
	setReps,
}) => {
	const [percentage, setPercentage] = useState(0);
	const [done, setDone] = useState(!active);

	useEffect(() => {
		setPercentage((100 * reps) / quantity);
	}, [reps]);

	useEffect(() => {
		setDone(reps === quantity);
	}, [reps]);

	let borderColor = '';
	let iconColor = '';
	let shadowColor = '';
	let bgColor = '';

	switch (color) {
		case Color.Green:
			borderColor = 'border-l-green-400';
			iconColor = 'text-green-400';
			shadowColor = 'shadow-green-500';
			bgColor = 'bg-green-400';
			break;
		case Color.Red:
			borderColor = 'border-l-red-400';
			iconColor = 'text-red-400';
			shadowColor = 'shadow-red-500';
			bgColor = 'bg-red-400';
			break;
		case Color.Blue:
			borderColor = 'border-l-blue-400';
			iconColor = 'text-blue-400';
			shadowColor = 'shadow-blue-500';
			bgColor = 'bg-blue-400';
			break;
		case Color.Yellow:
			borderColor = 'border-l-yellow-400';
			iconColor = 'text-yellow-400';
			shadowColor = 'shadow-yellow-500';
			bgColor = 'bg-yellow-400';
			break;
	}

	const diff = endTime?.diff(startTime || DateTime.now(), [
		'hours',
		'minutes',
		'seconds',
		'milliseconds',
	]);

	return (
		<div
			className={`z-30 flex w-full flex-col gap-3 rounded-md border-l-8 bg-neutral-900 py-3 px-6 shadow-2xl ${
				!done ? borderColor : 'border-neutral-800'
			} ${!done && shadowColor}`}
		>
			<div className="flex items-center gap-6">
				<div className={`${!done ? iconColor : 'text-neutral-800'}`}>
					{React.createElement(icon, { size: 30 })}
				</div>
				<div
					className={`flex flex-1 flex-col gap-3 ${
						!done ? 'text-neutral-400' : ''
					}}`}
				>
					<div className="flex flex-col gap-3 sm:flex-row">
						<div className="flex flex-col">
							<h2 className="font-mono text-lg font-bold">
								{String(reps).padStart(3, '0')}{' '}
								<span className="text-sm font-normal text-neutral-400">
									/ {quantity} reps
								</span>
							</h2>
							<h3
								className={`text-sm ${
									!done ? 'text-neutral-400' : 'text-neutral-400'
								}`}
							>
								{name}
							</h3>
						</div>
					</div>
				</div>
			</div>
			{!done && (
				<div className="flex flex-1 gap-3">
					{[50, 25, 10, 5].map((step) => (
						<IncrementBtn
							key={step}
							onClick={() =>
								setReps((prev) => {
									let newVal = prev + quantity / step;
									if (newVal > quantity) {
										newVal = quantity;
									}
									return newVal;
								})
							}
							amount={quantity / step}
						/>
					))}
				</div>
			)}
			<div className="h-2 w-full overflow-hidden rounded-md bg-neutral-800">
				<div
					style={{ width: String(percentage).concat('%') }}
					className={`h-2 transition-all ${!done ? bgColor : 'bg-neutral-700'}`}
				></div>
			</div>
		</div>
	);
};
