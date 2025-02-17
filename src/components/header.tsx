'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AiFillAlert } from 'react-icons/ai';
import { Hamburguer } from './hamburguer';

export function Header() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="w-screen shadow-md h-16 flex items-center justify-between px-4 text-2xl font-semibold bg-slate-50">
			<Link href={'/'}>DST ou Ressaca?</Link>

			<nav className="hidden md:flex gap-4">
				<Link href={'/'} className="hover:underline">
					Sobre
				</Link>
				<Link href={'/'} className="hover:underline">
					Diagnóstico Profissional
				</Link>
				<Link href={'/'} className="flex items-center hover:underline">
					SOS Farmácias
					<AiFillAlert className="text-red-500" size={30} />
				</Link>
			</nav>

			<Hamburguer isOpen={isOpen} setIsOpen={setIsOpen} />
		</header>
	);
}
