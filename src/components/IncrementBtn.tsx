type Props = {
	amount: number;
	onClick: () => void;
};

export const IncrementBtn: React.FC<Props> = ({ amount, onClick }) => {
	return (
		<button
			onClick={onClick}
			className="flex-1 rounded-md bg-neutral-800 p-3 transition hover:bg-neutral-700"
		>
			+ {amount}
		</button>
	);
};
