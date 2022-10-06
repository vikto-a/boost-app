import Image from 'next/future/image';
import { useSession } from 'next-auth/react';

export const WelcomeUser: React.FC = () => {
	const { data: session } = useSession();

	return (
		<div className="flex items-center gap-6">
			<div className="relative h-16 w-16 rounded-full bg-neutral-900">
				{session?.user?.image && (
					<Image
						src={session.user?.image}
						fill
						alt="Profile picture"
						sizes="64px"
					/>
				)}
			</div>
			<h1 className="flex flex-col text-2xl font-bold">
				<span className="text-base font-normal text-neutral-500">Welcome</span>
				<span>{session?.user?.name}</span>
			</h1>
		</div>
	);
};
