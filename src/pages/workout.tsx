import { Center, Page } from '@layouts';
import { GiBiceps, GiChestArmor, GiLeg, GiRun } from 'react-icons/gi';
import { Stage, Timer } from '@components';

import { Color } from '@type';
import { DateTime } from 'luxon';
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

				<span className="text-sm text-neutral-400">Up Next</span>
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
			</Center>
		</Page>
	);
};

export default Workout;
