import { GiLabradorHead } from 'react-icons/gi';

export const Footer: React.FC = () => {
	return (
		<footer className="relative flex flex-col items-center justify-center">
			<div className="absolute h-52 overflow-hidden text-neutral-800">
				<GiLabradorHead size={300} />
			</div>
			<a
				href="https://raymondkneipp.com"
				className="z-40 text-white hover:underline"
			>
				Made with ❤️ by Raymond Kneipp
			</a>
		</footer>
	);
};
