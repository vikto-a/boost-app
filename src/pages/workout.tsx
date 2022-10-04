import { DateTime } from 'luxon';
import type { NextPage } from 'next';
import { Page } from '@layouts';
import { Timer } from '@components';
import { useState } from 'react';

const Workout: NextPage = () => {
	const [start, setStart] = useState(DateTime.now());

	return (
		<Page title="Murph Workout">
			<div>
				<h1>Some Text</h1>

				<Timer start={start} />
			</div>
		</Page>
	);
};

export default Workout;
