type Props = {
	quantity: string;
	name: string;
	color: string;
};

const Exercise: React.FC<Props> = ({ quantity, name, color }) => {
	return (
		<div className={`rounded-md border-l-8 ${color}`}>
			<h2>{quantity}</h2>
			<h3>{name}</h3>
		</div>
	);
};

export const Hero: React.FC = () => {
	return (
		<section>
			<h1>Murph Workout</h1>
			<div>
				<Exercise quantity="1 Mile" name="Sprint" color="border-l-green-400" />
				<Exercise
					quantity="100 Reps"
					name="Pull Ups"
					color="border-l-red-400"
				/>
				<Exercise
					quantity="200 Reps"
					name="Push Ups"
					color="border-l-blue-400"
				/>
				<Exercise
					quantity="300 Reps"
					name="Squats"
					color="border-l-yellow-400"
				/>
				<Exercise quantity="1 Mile" name="Sprint" color="border-l-green-400" />
			</div>
		</section>
	);
};
