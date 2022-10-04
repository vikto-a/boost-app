import { Center, Page } from '@layouts';
import { Event, RepEvent, Timer } from '@components';
import {
	GiBiceps,
	GiCheckMark,
	GiChestArmor,
	GiLeg,
	GiNextButton,
	GiRun,
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
	const [start] = useState(DateTime.now());
	const [stage, setStage] = useState(Stage.FirstSprint);
	const [timerRunning, setTimerRunning] = useState(true);

	const [firstSprintEndTime, setFirstSprintEndTime] = useState<
		DateTime | undefined
	>(undefined);
	const [exerciseEndTime, setExerciseEndTime] = useState<DateTime | undefined>(
		undefined
	);
	const [lastSprintEndTime, setLastSprintEndTime] = useState<
		DateTime | undefined
	>(undefined);

	const [pullups, setPullups] = useState(0);
	const [pushups, setPushups] = useState(0);
	const [squats, setSquats] = useState(0);

	return (
		<Page title="Murph Workout">
			<Center>
				<Timer start={start} running={timerRunning} />

				<div className="flex w-full flex-col gap-3">
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
								reps={pullups}
								setReps={setPullups}
							/>
							<RepEvent
								icon={GiChestArmor}
								quantity={200}
								name="Push Ups"
								color={Color.Blue}
								active={stage === Stage.Exercises}
								endTime={exerciseEndTime}
								startTime={firstSprintEndTime}
								reps={pushups}
								setReps={setPushups}
							/>
							<RepEvent
								icon={GiLeg}
								quantity={300}
								name="Squats"
								color={Color.Yellow}
								active={stage === Stage.Exercises}
								endTime={exerciseEndTime}
								startTime={firstSprintEndTime}
								reps={squats}
								setReps={setSquats}
							/>
						</>
					)}
					{stage > Stage.Exercises && (
						<Event
							icon={GiCheckMark}
							quantity="600 reps"
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
				<div className="flex w-full items-center justify-between">
					<Link
						href="/"
						className="rounded-md bg-neutral-900 py-3 px-6 text-neutral-300 transition hover:bg-neutral-800"
					>
						Cancel
					</Link>
					{stage < Stage.Finish && (
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
											setTimerRunning(false);
											break;
									}

									return ++prev;
								})
							}
							disabled={
								stage === Stage.Exercises &&
								(pullups !== 100 || pushups !== 200 || squats !== 300)
							}
							className="flex items-center gap-3 rounded-md bg-purple-400 px-6 py-3 text-black shadow-2xl shadow-purple-500 transition hover:bg-purple-300 disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:text-neutral-700 disabled:shadow-none"
						>
							{stage !== Stage.LastSprint ? (
								<>
									<span className="font-bold">Next</span>
									<GiNextButton size={20} />
								</>
							) : (
								<>
									<span className="font-bold">Finish</span>
									<GiCheckMark size={20} />
								</>
							)}
						</button>
					)}
				</div>

				{stage < Stage.LastSprint && (
					<div className="flex w-full flex-col gap-3">
						<span className="text-center text-sm text-neutral-400">
							Up Next
						</span>
						{stage < Stage.Exercises && (
							<div className="grid gap-3 md:grid-cols-3">
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
