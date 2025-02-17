import Link from 'next/link';
import { AiFillAlert } from 'react-icons/ai';
import { HiX, HiMenu } from 'react-icons/hi';

interface HamburguerProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

export function Hamburguer({ isOpen, setIsOpen }: HamburguerProps) {
	return (
		<>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="md:hidden focus:outline-none"
			>
				{isOpen ? <HiX size={30} /> : <HiMenu size={30} />}
			</button>
			{isOpen && (
				<nav className="absolute top-16 left-0 w-full bg-slate-50 shadow-md flex flex-col gap-4 p-4 md:hidden">
					<Link
						href={'/'}
						className="hover:underline w-full border-y py-4"
						onClick={() => setIsOpen(false)}
					>
						Sobre
					</Link>
					<Link
						href={'/'}
						className="hover:underline w-full border-y py-4"
						onClick={() => setIsOpen(false)}
					>
						Diagnóstico Profissional
					</Link>
					<Link
						href={'/'}
						className="flex items-center hover:underline w-full border-y py-4"
						onClick={() => setIsOpen(false)}
					>
						SOS Farmácias
						<AiFillAlert className="text-red-500" size={30} />
					</Link>
				</nav>
			)}
		</>
	);
}
