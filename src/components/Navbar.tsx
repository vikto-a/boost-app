import { Btn, Card, NavLink, SignOutBtn } from '@components';
import {
	GiDogHouse,
	GiHamburgerMenu,
	GiJumpingDog,
	GiLabradorHead,
	GiLaurelsTrophy,
	GiSittingDog,
} from 'react-icons/gi';

import { Popover } from '@headlessui/react';
import { useSession } from 'next-auth/react';

export const Navbar: React.FC = () => {
	const { data: session } = useSession();

	return (
		<nav className="absolute top-6 right-6 left-6 z-40 flex items-center justify-between rounded-md bg-black px-6">
			<div className="flex items-center gap-3">
				<span className="text-purple-400">
					<GiLabradorHead size={30} />
				</span>
				<span className="py-3 text-xl font-bold">Murph</span>
			</div>

			<div className="hidden items-center md:flex">
				<NavLink to="/" icon={GiDogHouse}>
					Home
				</NavLink>
				<NavLink to="/leaderboard" icon={GiLaurelsTrophy}>
					Leaderboard
				</NavLink>
				{session ? (
					<div className="flex items-center">
						<NavLink to="/me" icon={GiSittingDog}>
							Profile
						</NavLink>
						<SignOutBtn />
					</div>
				) : (
					<Btn icon={GiJumpingDog} to="/login">
						Login
					</Btn>
				)}
			</div>

			<Popover className="md:hidden">
				<Popover.Button className="p-3">
					<GiHamburgerMenu size={25} />
				</Popover.Button>

				<Popover.Overlay className="fixed inset-0 bg-black opacity-70" />

				<Popover.Panel className="fixed top-6 left-6 right-6 z-40">
					<Card color="purple">
						<div className="flex flex-col gap-3 py-3">
							<NavLink to="/" icon={GiDogHouse}>
								Home
							</NavLink>
							<NavLink to="/leaderboard" icon={GiLaurelsTrophy}>
								Leaderboard
							</NavLink>
							{session ? (
								<div className="flex flex-col gap-3">
									<NavLink to="/me" icon={GiSittingDog}>
										Profile
									</NavLink>
									<SignOutBtn />
								</div>
							) : (
								<Btn icon={GiJumpingDog} to="/login">
									Login
								</Btn>
							)}
						</div>
					</Card>
				</Popover.Panel>
			</Popover>
		</nav>
	);
};
