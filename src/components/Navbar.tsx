import {
	GiHamburgerMenu,
	GiHouse,
	GiLaurelsTrophy,
	GiSharpedTeethSkull,
	GiSkeletonKey,
} from 'react-icons/gi';

import { NavLink } from '@components';
import { Popover } from '@headlessui/react';

export const Navbar: React.FC = () => {
	return (
		<nav className="absolute top-6 right-6 left-6 z-40 flex items-center justify-between rounded-md border-l-8 border-purple-400 bg-neutral-900 px-6 shadow-2xl shadow-purple-500">
			<div className="flex items-center gap-3">
				<span className="text-purple-400">
					<GiSharpedTeethSkull size={30} />
				</span>
				<span className="py-3 text-xl font-bold uppercase">Murph</span>
			</div>

			<div className="hidden items-center sm:flex">
				<NavLink to="/" icon={GiHouse}>
					Home
				</NavLink>
				<NavLink to="/leaderboard" icon={GiLaurelsTrophy}>
					Leaderboard
				</NavLink>
				<NavLink to="/login" icon={GiSkeletonKey}>
					Login
				</NavLink>
			</div>

			<Popover className="sm:hidden">
				<Popover.Button className="p-3">
					<GiHamburgerMenu size={25} />
				</Popover.Button>

				<Popover.Overlay className="fixed inset-0 bg-black opacity-70" />

				<Popover.Panel className="fixed top-6 left-6 right-6 z-40 rounded-md border-l-8 border-purple-400 bg-neutral-900 py-3">
					<div className="flex flex-col">
						<NavLink to="/" icon={GiHouse}>
							Home
						</NavLink>
						<NavLink to="/leaderboard" icon={GiLaurelsTrophy}>
							Leaderboard
						</NavLink>
						<NavLink to="/login" icon={GiSkeletonKey}>
							Login
						</NavLink>
					</div>
				</Popover.Panel>
			</Popover>
		</nav>
	);
};
