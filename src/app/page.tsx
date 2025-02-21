import { Header } from '@/components/header';
import carnavalKiss from '@/assets/carnaval-just-dance.png';
import carnavalLogo from '@/assets/carnaval-2025.png';
import condomAdvertence from '@/assets/condom-advertence.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<div className="w-screen shadow h-80 bg-amber-500 flex flex-row-reverse items-center justify-around px-8 py-2">
					<div className="w-1/2">
						<p className="text-lg md:text-2xl text-slate-100 font-bold text-center mb-12 leading-relaxed">
							Ficou bebado e pegou geral? Sem problemas, aqui iremos te dizer se você
							está com uma doença venerea ou uma ressaca venenosa!{' '}
						</p>
					</div>
					<Image
						src={carnavalKiss}
						alt="Uma mulher do just dance dando beijo"
						className="w-64 h-64 md:min-w-80 md:h-full"
					/>
				</div>
				<div className="w-screen shadow h-80 bg-emerald-500 flex items-center justify-around px-8 py-2">
					<div className="w-1/2 flex flex-col items-center">
						<p className="text-lg md:text-2xl text-slate-100 font-bold text-center mb-12 leading-relaxed">
							Clique aqui abaixo para começar seu diagnóstico. Fique tranquilo, seus
							dados só são compartilhados com profissionais
						</p>
						<Button variant={'green'}>Iniciar</Button>
					</div>
					<Image
						src={carnavalLogo}
						alt="Uma mulher do just dance dando beijo"
						className="w-56 h-40 md:min-w-80 md:h-3/4"
					/>
				</div>
				<div className="w-screen shadow h-80 bg-amber-500 flex flex-row-reverse items-center justify-around px-8 py-2">
					<div className="w-1/2">
						<p className="text-lg md:text-2xl text-slate-100 font-bold text-center mb-12 leading-relaxed">
							Ficou bebado e pegou geral? Sem problemas, aqui iremos te dizer se você
							está com uma doença venerea ou uma ressaca venenosa!{' '}
						</p>
					</div>
					<Image
						src={condomAdvertence}
						alt="Uma mulher do just dance dando beijo"
						className="w-44 h-36 md:min-w-80 md:h-3/4"
					/>
				</div>
			</main>
			<footer className="text-center px-4 font-semibold py-2 shadow">
				&copy;Rafael Santiago 2025
			</footer>
		</>
	);
}
