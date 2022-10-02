import { Btn, Exercise } from '@components';
import {
	GiBiceps,
	GiChestArmor,
	GiLeg,
	GiPlayButton,
	GiRun,
} from 'react-icons/Gi';

import { Color } from '@type';

export const Hero: React.FC = () => {
	return (
		<section className="flex flex-col items-center gap-6">
			<h1 className="text-center text-2xl font-bold">Murph Workout</h1>
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
			<Btn to="/begin" icon={GiPlayButton}>
				Start
			</Btn>
		</section>
	);
};
