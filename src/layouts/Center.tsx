type Props = {
	children: React.ReactNode;
};
export const Center: React.FC<Props> = ({ children }) => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			{children}
		</div>
	);
};
