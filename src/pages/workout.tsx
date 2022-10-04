import { Center, Page } from '@layouts';
import {
	GiBiceps,
	GiChestArmor,
	GiLeg,
	GiNextButton,
	GiRun,
	GiTrashCan,
} from 'react-icons/gi';
import { Stage, Timer } from '@components';

import { Color } from '@type';
import { DateTime } from 'luxon';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useState } from 'react';

const Workout: NextPage = () => {
	const [start, setStart] = useState(DateTime.now());

	return (
		<Page title="Murph Workout">
			<Center>
				<Stage
					icon={GiRun}
					quantity="1 Mile"
					name="Sprint"
					color={Color.Green}
					active
				/>

				<Timer start={start} />

				<div className="flex w-full items-center justify-between">
					<Link href="/" className="flex items-center gap-1 text-neutral-400">
						<GiTrashCan size={20} />
						<span>Cancel</span>
					</Link>
					<button
						// disabled
						className="flex items-center gap-3 rounded-md bg-purple-400 px-6 py-3 text-black shadow-xl shadow-purple-500 disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:text-neutral-700 disabled:shadow-none"
					>
						<span className="font-bold">Next</span>
						<GiNextButton size={25} />
					</button>
				</div>

				<div className="flex w-full flex-col gap-6">
					<span className="text-center text-sm text-neutral-400">Up Next</span>
					<div className="grid w-full grid-cols-3 gap-6">
						<Stage
							icon={GiBiceps}
							quantity="100 Reps"
							name="Pull Ups"
							color={Color.Red}
						/>
						<Stage
							icon={GiChestArmor}
							quantity="200 Reps"
							name="Push Ups"
							color={Color.Blue}
						/>
						<Stage
							icon={GiLeg}
							quantity="300 Reps"
							name="Squats"
							color={Color.Yellow}
						/>
					</div>
					<Stage
						icon={GiRun}
						quantity="1 Mile"
						name="Sprint"
						color={Color.Green}
					/>
				</div>
			</Center>
		</Page>
	);
};

export default Workout;
