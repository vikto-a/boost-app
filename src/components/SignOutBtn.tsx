import { GiCrossedBones } from 'react-icons/gi';
import { signOut } from 'next-auth/react';

export const SignOutBtn: React.FC = () => {
	return (
		<button
			onClick={() => signOut()}
			className="flex items-center gap-3 rounded-md border border-red-400 bg-black px-6 py-3 text-red-400 transition hover:bg-neutral-900"
		>
			<span className="flex-1 text-center">Sign Out</span>
			<GiCrossedBones size={20} />
		</button>
	);
};
