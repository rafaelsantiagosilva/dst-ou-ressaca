import Link from 'next/link';
import { AiFillAlert } from 'react-icons/ai';
import { Hamburguer } from './hamburguer';

export function Header() {
	return (
		<header className="w-screen shadow h-14 flex items-center justify-between px-7 text-lg font-semibold bg-slate-50">
			<Link href={'/'}>DST ou Ressaca?</Link>

			<nav className="hidden md:flex gap-4">
				<Link href={'/diagnosis/1'} className="hover:underline">
					Diagnóstico Profissional
				</Link>
				<Link
					href={'/pharmacies'}
					className="flex items-center hover:underline gap-1"
				>
					<AiFillAlert className="text-red-500" size={20} />
					SOS Farmácias
					<AiFillAlert className="text-red-500" size={20} />
				</Link>
			</nav>

			<Hamburguer />
		</header>
	);
}
