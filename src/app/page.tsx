'use client';

import carnavalLogo from '@/assets/carnaval-2025.png';
import carnavalKiss from '@/assets/carnaval-just-dance.png';
import condomAdvertence from '@/assets/condom-advertence.png';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
	useEffect(() => {
		// Confete ao carregar a página
		confetti({
			particleCount: 200,
			spread: 100,
			origin: { y: 0.6 },
		});
	}, []);

	const triggerConfetti = () => {
		confetti({
			particleCount: 150,
			spread: 120,
			origin: { y: 0.6 },
			colors: ['#FF0A54', '#FF477E', '#FF7096', '#FF85A1', '#FBB1BD', '#F9BEC7'],
		});
	};

	return (
		<>
			<Header />
			<main>
				<div className="w-screen shadow h-80 bg-amber-500 flex flex-row-reverse items-center justify-around px-8 py-2">
					<div className="w-1/2">
						<p className="text-lg md:text-2xl text-slate-100 font-bold text-center mb-6 leading-1">
							Ficou bebado e pegou geral? Sem problemas, aqui iremos te dizer se você
							está com uma doença venerea ou uma ressaca venenosa!
						</p>
					</div>
					<Image
						src={carnavalKiss}
						alt="Uma mulher do just dance dando beijo"
						className="w-[45%] h-[50%] md:w-80 md:h-full"
					/>
				</div>

				<div className="w-screen shadow h-80 bg-emerald-500 flex items-center justify-around px-8 py-2">
					<div className="w-1/2 flex flex-col items-center">
						<p className="text-lg md:text-2xl text-slate-100 font-bold text-center mb-6 leading-1">
							Clique aqui abaixo para começar seu diagnóstico. Fique tranquilo, seus
							dados só são compartilhados com profissionais
						</p>
						<Button variant={'green'} onClick={triggerConfetti}>
							Iniciar 🎉
						</Button>
					</div>
					<Image
						src={carnavalLogo}
						alt="Logo Carnaval 2025"
						className="w-[45%] h-[50%] md:w-80 md:h-3/4"
					/>
				</div>

				<div className="w-screen shadow h-80 bg-amber-500 flex flex-row-reverse items-center justify-around px-8 py-2">
					<div className="w-1/2 flex flex-col items-center gap-2">
						<p className="text-lg md:text-2xl text-slate-100 font-bold text-center mb-6 leading-1">
							Está precisando de certos cuidados? Veja aqui as farmácias mais próximas
							de você?
						</p>
						<Button className="w-auto text-lg md:text-2xl" variant={'amber'} asChild>
							<Link href={'/pharmacies'}>Farmácias 📌</Link>
						</Button>
					</div>
					<Image
						src={condomAdvertence}
						alt="Aviso de preservativo"
						className="w-[45%] h-[50%] md:w-80 md:h-3/4"
					/>
				</div>
			</main>
			<Footer />
		</>
	);
}
