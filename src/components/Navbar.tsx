import {
	GiDogHouse,
	GiHamburgerMenu,
	GiJumpingDog,
	GiLabradorHead,
	GiLaurelsTrophy,
	GiSittingDog,
} from 'react-icons/gi';

import { NavLink } from '@components';
import { Popover } from '@headlessui/react';
import { useSession } from 'next-auth/react';

export const Navbar: React.FC = () => {
	const { data: session } = useSession();

	return (
		<nav className="absolute top-6 right-6 left-6 z-40 flex items-center justify-between rounded-md border-l-8 border-purple-400 bg-neutral-900 px-6 shadow-2xl shadow-purple-500">
			<div className="flex items-center gap-3">
				<span className="text-purple-400">
					<GiLabradorHead size={30} />
				</span>
				<span className="py-3 text-xl font-bold">Murph</span>
			</div>

			<div className="hidden items-center sm:flex">
				<NavLink to="/" icon={GiDogHouse}>
					Home
				</NavLink>
				<NavLink to="/leaderboard" icon={GiLaurelsTrophy}>
					Leaderboard
				</NavLink>
				{session ? (
					<NavLink to="/me" icon={GiSittingDog}>
						Profile
					</NavLink>
				) : (
					<NavLink to="/login" icon={GiJumpingDog}>
						Login
					</NavLink>
				)}
			</div>

			<Popover className="sm:hidden">
				<Popover.Button className="p-3">
					<GiHamburgerMenu size={25} />
				</Popover.Button>

				<Popover.Overlay className="fixed inset-0 bg-black opacity-70" />

				<Popover.Panel className="fixed top-6 left-6 right-6 z-40 rounded-md border-l-8 border-purple-400 bg-neutral-900 py-3">
					<div className="flex flex-col">
						<NavLink to="/" icon={GiDogHouse}>
							Home
						</NavLink>
						<NavLink to="/leaderboard" icon={GiLaurelsTrophy}>
							Leaderboard
						</NavLink>
						{session ? (
							<NavLink to="/me" icon={GiSittingDog}>
								Profile
							</NavLink>
						) : (
							<NavLink to="/login" icon={GiJumpingDog}>
								Login
							</NavLink>
						)}
					</div>
				</Popover.Panel>
			</Popover>
		</nav>
	);
};
