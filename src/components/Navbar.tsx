import { GiCrosshair } from 'react-icons/gi';
import { NavLink } from '@components';

export const Navbar: React.FC = () => {
	return (
		<nav className="sticky top-6 mx-6 flex justify-center">
			<div className="container flex items-center justify-between rounded-md bg-neutral-900 px-6">
				<div className="flex items-center gap-3">
					<GiCrosshair size={30} />
					<span className="py-3 text-xl font-bold uppercase">Murph</span>
				</div>

				<div className="flex items-center">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/leaderboard">Leaderboard</NavLink>
					<NavLink to="/login">Login</NavLink>
				</div>
			</div>
		</nav>
	);
};
