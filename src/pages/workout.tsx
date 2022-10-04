import { Center, Page } from '@layouts';
import { Event, RepEvent, Timer } from '@components';
import {
	GiBiceps,
	GiCheckMark,
	GiChestArmor,
	GiLeg,
	GiNextButton,
	GiPreviousButton,
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
	Finish = 4,
}

const Workout: NextPage = () => {
	const [start, setStart] = useState(DateTime.now());
	const [stage, setStage] = useState(Stage.FirstSprint);

	const [firstSprintEndTime, setFirstSprintEndTime] = useState<
		DateTime | undefined
	>(undefined);
	const [exerciseEndTime, setExerciseEndTime] = useState<DateTime | undefined>(
		undefined
	);
	const [lastSprintEndTime, setLastSprintEndTime] = useState<
		DateTime | undefined
	>(undefined);

	return (
		<Page title="Murph Workout">
			<Center>
				<Link href="/" className="flex items-center gap-1 text-neutral-400">
					<GiTrashCan size={20} />
					<span>Cancel</span>
				</Link>
				<div className="flex w-full flex-col gap-6">
					{stage >= Stage.FirstSprint && (
						<Event
							icon={GiRun}
							quantity="1 Mile"
							name="Sprint"
							color={Color.Green}
							active={stage === Stage.FirstSprint}
							startTime={start}
							endTime={firstSprintEndTime}
						/>
					)}
					{stage === Stage.Exercises && (
						<>
							<RepEvent
								icon={GiBiceps}
								quantity={100}
								name="Pull Ups"
								color={Color.Red}
								active={stage === Stage.Exercises}
								endTime={exerciseEndTime}
								startTime={firstSprintEndTime}
							/>
							<RepEvent
								icon={GiChestArmor}
								quantity={200}
								name="Push Ups"
								color={Color.Blue}
								active={stage === Stage.Exercises}
								endTime={exerciseEndTime}
								startTime={firstSprintEndTime}
							/>
							<RepEvent
								icon={GiLeg}
								quantity={300}
								name="Squats"
								color={Color.Yellow}
								active={stage === Stage.Exercises}
								endTime={exerciseEndTime}
								startTime={firstSprintEndTime}
							/>
						</>
					)}
					{stage > Stage.Exercises && (
						<Event
							icon={GiCheckMark}
							quantity="600"
							name="Exercises"
							color={Color.Green}
							active={stage === Stage.Exercises}
							startTime={firstSprintEndTime}
							endTime={exerciseEndTime}
						/>
					)}
					{stage >= Stage.LastSprint && (
						<Event
							icon={GiRun}
							quantity="1 Mile"
							name="Sprint"
							color={Color.Green}
							active={stage === Stage.LastSprint}
							endTime={lastSprintEndTime}
							startTime={exerciseEndTime}
						/>
					)}
				</div>

				<Timer start={start} />
				<div className="flex w-full items-center justify-between">
					{stage > Stage.FirstSprint && (
						<button
							onClick={() =>
								setStage((prev) => {
									switch (stage) {
										case Stage.FirstSprint:
											setFirstSprintEndTime(undefined);
											setExerciseEndTime(undefined);
											setLastSprintEndTime(undefined);
											break;
										case Stage.Exercises:
											setFirstSprintEndTime(undefined);
											setExerciseEndTime(undefined);
											setLastSprintEndTime(undefined);
										case Stage.LastSprint:
											setLastSprintEndTime(undefined);
									}
									return --prev;
								})
							}
							className="flex items-center gap-1 py-3 text-neutral-400"
						>
							<GiPreviousButton size={20} />
							<span>Back</span>
						</button>
					)}
					<button
						onClick={() =>
							setStage((prev) => {
								switch (stage) {
									case Stage.FirstSprint:
										setFirstSprintEndTime(DateTime.now());
										setExerciseEndTime(undefined);
										setLastSprintEndTime(undefined);
										break;
									case Stage.Exercises:
										setExerciseEndTime(DateTime.now());
										setLastSprintEndTime(undefined);
										break;
									case Stage.LastSprint:
										setLastSprintEndTime(DateTime.now());
										// stop timer
										break;
								}

								return ++prev;
							})
						}
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
							<div className="grid gap-6 md:grid-cols-3">
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
