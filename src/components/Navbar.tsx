import { GiHamburgerMenu, GiRoundStar } from 'react-icons/gi';

import { NavLink } from '@components';
import { Popover } from '@headlessui/react';

export const Navbar: React.FC = () => {
	return (
		<nav className="fixed top-6 right-6 left-6 z-40 flex items-center justify-between rounded-md bg-purple-400 px-6 text-black">
			<div className="flex items-center gap-3">
				<GiRoundStar size={30} />
				<span className="py-3 text-xl font-bold uppercase">Murph</span>
			</div>

			<div className="hidden items-center sm:flex">
				<NavLink to="/">Home</NavLink>
				<NavLink to="/leaderboard">Leaderboard</NavLink>
				<NavLink to="/login">Login</NavLink>
			</div>

			<Popover className="sm:hidden">
				<Popover.Button className="p-3">
					<GiHamburgerMenu size={30} />
				</Popover.Button>

				<Popover.Overlay className="fixed inset-0 bg-black opacity-70" />

				<Popover.Panel className="absolute top-20 left-0 right-0 z-40 rounded-md bg-purple-400 py-3">
					<div className="flex flex-col">
						<NavLink to="/">Home</NavLink>
						<NavLink to="/leaderboard">Leaderboard</NavLink>
						<NavLink to="/login">Login</NavLink>
					</div>
				</Popover.Panel>
			</Popover>
		</nav>
	);
};
