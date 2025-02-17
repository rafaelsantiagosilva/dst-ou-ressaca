import Link from 'next/link';
import { FaGlassWater } from 'react-icons/fa6';
import { IoBeer } from 'react-icons/io5';
import { Button } from '@/components/ui/button';

export default function NotFound() {
	return (
		<div className="flex flex-col gap-4 items-center justify-center h-screen ">
			<h1 className="font-bold text-6xl flex">
				Opaaa, bebeu demais? <IoBeer size={60} className="text-amber-500" />
			</h1>
			<h2 className="font-semibold text-3xl flex">
				Meu companheiro, essa página não existe. Beba uma água{' '}
				<FaGlassWater size={40} className="text-cyan-500" />{' '}
			</h2>
			<div>
				<Button
					className="text-2xl p-6 border-4 border-r-8 border-b-8 border-slate-900 bg-amber-500 hover:bg-amber-400 font-semibold w-36 active:border-r-4 active:border-b-4"
					asChild
				>
					<Link href={'/'}>Voltar</Link>
				</Button>
			</div>
		</div>
	);
}
