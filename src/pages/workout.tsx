import type { NextPage } from 'next';
import { Page } from '@layouts';
import { trpc } from '../utils/trpc';

const Workout: NextPage = () => {
	const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);

	/*
	
	- get datetime
	- calc time since date
	- display time to screen
	
	*/

	return (
		<Page title="Murph Workout">
			<h1>{hello.data ? hello.data.greeting : 'loading...'}</h1>
		</Page>
	);
};

export default Workout;
