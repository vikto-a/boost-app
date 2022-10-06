import { GiSpinalCoil } from 'react-icons/gi';

export const Loading: React.FC = () => {
	return (
		<div className="mx-auto inline-flex h-5 w-5 animate-spin text-neutral-400">
			<GiSpinalCoil size={20} />
		</div>
	);
};
