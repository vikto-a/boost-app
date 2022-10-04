import { Btn, Exercise } from '@components';
import {
	GiBiceps,
	GiChestArmor,
	GiLeg,
	GiPlayButton,
	GiRun,
} from 'react-icons/gi';

import { Color } from '@type';

export const Hero: React.FC = () => {
	return (
		<section className="container mx-auto grid min-h-screen items-center gap-12 px-6 py-24 md:grid-cols-2">
			<div className="flex flex-col items-center gap-3 md:items-start">
				<h1 className="text-center text-2xl font-bold md:text-left">
					Murph Workout
				</h1>
				<p className="text-center text-lg text-neutral-400 md:text-left">
					Lieutenant Michael Murphy was a SEAL team member who lost his life
					serving his country in Afghanistan in 2005 during Operation Red Wings.
					This workout is dedicated to him and all the other service members who
					have lost their lives serving their country.
				</p>

				<Btn to="/workout" icon={GiPlayButton}>
					Start
				</Btn>
			</div>
			<div className="relative flex flex-col items-center gap-6">
				<div className="absolute top-0 bottom-0 z-10 w-px border border-dashed border-white"></div>
				<Exercise
					icon={GiRun}
					quantity="1 Mile"
					name="Sprint"
					color={Color.Green}
				/>
				<Exercise
					icon={GiBiceps}
					quantity="100 Reps"
					name="Pull Ups"
					color={Color.Red}
				/>
				<Exercise
					icon={GiChestArmor}
					quantity="200 Reps"
					name="Push Ups"
					color={Color.Blue}
				/>
				<Exercise
					icon={GiLeg}
					quantity="300 Reps"
					name="Squats"
					color={Color.Yellow}
				/>
				<Exercise
					icon={GiRun}
					quantity="1 Mile"
					name="Sprint"
					color={Color.Green}
				/>
			</div>
		</section>
	);
};
