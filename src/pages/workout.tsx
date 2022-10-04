import { Center, Page } from '@layouts';
import { Event, Timer } from '@components';
import {
	GiBiceps,
	GiChestArmor,
	GiLeg,
	GiNextButton,
	GiRun,
	GiTrashCan,
} from 'react-icons/gi';

import { Color } from '@type';
import { DateTime } from 'luxon';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useState } from 'react';

enum Stage {
	FirstSprint = 1,
	Exercises = 2,
	LastSprint = 3,
}

const Workout: NextPage = () => {
	const [start, setStart] = useState(DateTime.now());
	const [stage, setStage] = useState(Stage.FirstSprint);

	return (
		<Page title="Murph Workout">
			<Center>
				<div className="flex w-full flex-col gap-6">
					{stage >= Stage.FirstSprint && (
						<Event
							icon={GiRun}
							quantity="1 Mile"
							name="Sprint"
							color={Color.Green}
							active={stage === Stage.FirstSprint}
						/>
					)}
					{stage >= Stage.Exercises && (
						<div className="grid w-full grid-cols-3 gap-6">
							<Event
								icon={GiBiceps}
								quantity="100 Reps"
								name="Pull Ups"
								color={Color.Red}
								active={stage === Stage.Exercises}
							/>
							<Event
								icon={GiChestArmor}
								quantity="200 Reps"
								name="Push Ups"
								color={Color.Blue}
								active={stage === Stage.Exercises}
							/>
							<Event
								icon={GiLeg}
								quantity="300 Reps"
								name="Squats"
								color={Color.Yellow}
								active={stage === Stage.Exercises}
							/>
						</div>
					)}
					{stage >= Stage.LastSprint && (
						<Event
							icon={GiRun}
							quantity="1 Mile"
							name="Sprint"
							color={Color.Green}
							active={stage === Stage.LastSprint}
						/>
					)}
				</div>

				<div className="grid w-full grid-cols-[auto_1fr_auto] gap-3">
					<Link href="/" className="flex items-center gap-1 text-neutral-400">
						<GiTrashCan size={20} />
						<span>Cancel</span>
					</Link>

					<Timer start={start} />

					<button
						onClick={() => setStage((prev) => ++prev)}
						// disabled
						className="flex items-center gap-3 rounded-md bg-purple-400 px-6 py-3 text-black shadow-xl shadow-purple-500 disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:text-neutral-700 disabled:shadow-none"
					>
						<span className="font-bold">Next</span>
						<GiNextButton size={25} />
					</button>
				</div>

				{stage < Stage.LastSprint && (
					<div className="flex w-full flex-col gap-6">
						<span className="text-center text-sm text-neutral-400">
							Up Next
						</span>
						{stage < Stage.Exercises && (
							<div className="grid w-full grid-cols-3 gap-6">
								<Event
									icon={GiBiceps}
									quantity="100 Reps"
									name="Pull Ups"
									color={Color.Red}
								/>
								<Event
									icon={GiChestArmor}
									quantity="200 Reps"
									name="Push Ups"
									color={Color.Blue}
								/>
								<Event
									icon={GiLeg}
									quantity="300 Reps"
									name="Squats"
									color={Color.Yellow}
								/>
							</div>
						)}
						<Event
							icon={GiRun}
							quantity="1 Mile"
							name="Sprint"
							color={Color.Green}
						/>
					</div>
				)}
			</Center>
		</Page>
	);
};

export default Workout;
