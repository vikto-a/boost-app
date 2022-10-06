import { Hero } from '@components';
import type { NextPage } from 'next';
import { Page } from '@layouts';

const Home: NextPage = () => {
	return (
		<Page title="Murph">
			<Hero />
		</Page>
	);
};

export default Home;
