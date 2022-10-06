import { Btn, Event, RepEvent, Timer } from '@components';
import { Center, Page } from '@layouts';
import {
	GiBiceps,
	GiCheckMark,
	GiChestArmor,
	GiHouse,
	GiLeg,
	GiNextButton,
	GiRun,
	GiSittingDog,
} from 'react-icons/gi';

import Confetti from 'react-confetti';
import { DateTime } from 'luxon';
import Link from 'next/link';
import type { NextPage } from 'next';
import { trpc } from 'utils/trpc';
import { useSession } from 'next-auth/react';
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

	const { data: session } = useSession();

	const mutation = trpc.useMutation('murph.create');

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
							color="green"
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
								color="red"
								active={stage === Stage.Exercises}
								reps={pullups}
								setReps={setPullups}
							/>
							<RepEvent
								icon={GiChestArmor}
								quantity={200}
								name="Push Ups"
								color="blue"
								active={stage === Stage.Exercises}
								reps={pushups}
								setReps={setPushups}
							/>
							<RepEvent
								icon={GiLeg}
								quantity={300}
								name="Squats"
								color="yellow"
								active={stage === Stage.Exercises}
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
							color="green"
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
							color="green"
							active={stage === Stage.LastSprint}
							endTime={lastSprintEndTime}
							startTime={exerciseEndTime}
						/>
					)}
				</div>
				<div className="flex w-full items-center justify-between">
					{stage < Stage.Finish && (
						<>
							<Link
								href="/"
								className="rounded-md border border-neutral-800 bg-black py-3 px-6 text-neutral-300 transition hover:bg-neutral-900"
							>
								Cancel
							</Link>
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

												// save data to db if logged in
												if (session) {
													mutation.mutate({
														start: start.toJSDate(),
														firstSprintEndTime: firstSprintEndTime!.toJSDate(),
														exerciseEndTime: exerciseEndTime!.toJSDate(),
														lastSprintEndTime: DateTime.now().toJSDate(),
													});
												}

												break;
										}

										return ++prev;
									})
								}
								disabled={
									stage === Stage.Exercises &&
									(pullups !== 100 || pushups !== 200 || squats !== 300)
								}
								className="flex items-center gap-3 rounded-md border border-purple-400 bg-black px-6 py-3 text-purple-400 transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:border-neutral-800 disabled:bg-black disabled:text-neutral-700 disabled:shadow-none"
							>
								{stage !== Stage.LastSprint ? (
									<>
										Next
										<GiNextButton size={20} />
									</>
								) : (
									<>
										Finish
										<GiCheckMark size={20} />
									</>
								)}
							</button>
						</>
					)}

					{stage === Stage.Finish && (
						<div className="mx-auto">
							{session ? (
								<Btn to="/me" icon={GiSittingDog}>
									Profile
								</Btn>
							) : (
								<Btn to="/home" icon={GiHouse}>
									Home
								</Btn>
							)}
							<Confetti />
						</div>
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
									color="red"
								/>
								<Event
									icon={GiChestArmor}
									quantity="200 Reps"
									name="Push Ups"
									color="blue"
								/>
								<Event
									icon={GiLeg}
									quantity="300 Reps"
									name="Squats"
									color="yellow"
								/>
							</div>
						)}
						<Event icon={GiRun} quantity="1 Mile" name="Sprint" color="green" />
					</div>
				)}
			</Center>
		</Page>
	);
};

export default Workout;
