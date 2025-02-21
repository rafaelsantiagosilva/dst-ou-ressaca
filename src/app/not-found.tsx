import Link from 'next/link';
import { FaGlassWater } from 'react-icons/fa6';
import { IoBeer } from 'react-icons/io5';
import { Button } from '@/components/ui/button';

export default function NotFound() {
	return (
		<div className="flex flex-col gap-4 items-center justify-center h-screen ">
			<h1 className="font-bold text-6xl">
				Opaaa, bebeu demais? <IoBeer size={60} className="text-amber-500 inline" />
			</h1>
			<h2 className="font-semibold text-3xl">
				Meu companheiro, essa página não existe.{' '}
				<span>
					Beba uma água <FaGlassWater size={40} className="text-cyan-500 inline" />{' '}
				</span>
			</h2>
			<div>
				<Button variant={'amber'} asChild>
					<Link href={'/'}>Voltar</Link>
				</Button>
			</div>
		</div>
	);
}
