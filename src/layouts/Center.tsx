type Props = {
	children: React.ReactNode;
};
export const Center: React.FC<Props> = ({ children }) => {
	return (
		<div className="mx-auto flex min-h-screen max-w-screen-md flex-col items-center justify-center gap-12 py-24 px-6">
			{children}
		</div>
	);
};
