import { Card, IncrementBtn, Progress } from '@components';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Color } from '@type';
import type { IconType } from 'react-icons';

type Props = {
	quantity: number;
	name: string;
	color: Color;
	icon: IconType;
	active?: boolean;
	reps: number;
	setReps: Dispatch<SetStateAction<number>>;
};

export const RepEvent: React.FC<Props> = ({
	active,
	quantity,
	name,
	color,
	icon,
	reps,
	setReps,
}) => {
	const [done, setDone] = useState(!active);

	useEffect(() => {
		setDone(reps === quantity);
	}, [reps]);

	return (
		<Card icon={icon} color={color} mute={done}>
			<div className="grid gap-3">
				<div>
					<h2 className="font-mono text-lg font-bold">
						{String(reps).padStart(3, '0')}{' '}
						<span className="text-sm font-normal text-neutral-400">
							/ {quantity} reps
						</span>
					</h2>
					<h3 className="text-sm">{name}</h3>
				</div>

				{!done && (
					<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
				<Progress value={reps} max={quantity} color={color} mute={done} />
			</div>
		</Card>
	);
};
