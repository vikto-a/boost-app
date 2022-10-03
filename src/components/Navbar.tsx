import { GiCrosshair, GiHamburgerMenu } from 'react-icons/gi';

import { NavLink } from '@components';
import { Popover } from '@headlessui/react';

export const Navbar: React.FC = () => {
	return (
		<nav className="sticky top-6 z-40 mx-6 flex justify-center">
			<div className="container flex items-center justify-between rounded-md bg-neutral-900 px-6">
				<div className="flex items-center gap-3">
					<GiCrosshair size={30} />
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

					<Popover.Panel className="absolute top-20 left-0 right-0 z-30 rounded-md bg-neutral-900 py-3">
						<div className="flex flex-col">
							<NavLink to="/">Home</NavLink>
							<NavLink to="/leaderboard">Leaderboard</NavLink>
							<NavLink to="/login">Login</NavLink>
						</div>

						<img src="/solutions.jpg" alt="" />
					</Popover.Panel>
				</Popover>
			</div>
		</nav>
	);
};
