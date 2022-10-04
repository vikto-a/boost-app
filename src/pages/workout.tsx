import { Center, Page } from '@layouts';

import { DateTime } from 'luxon';
import type { NextPage } from 'next';
import { Timer } from '@components';
import { useState } from 'react';

const Workout: NextPage = () => {
	const [start, setStart] = useState(DateTime.now());

	return (
		<Page title="Murph Workout">
			<Center>
				<h1>Some Text</h1>

				<Timer start={start} />
			</Center>
		</Page>
	);
};

export default Workout;
