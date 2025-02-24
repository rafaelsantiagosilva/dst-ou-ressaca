'use client';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { House, RotateCcw, Hospital } from 'lucide-react';

export function Results() {
	let result: string = '';
	const diagnosisPoints = localStorage.getItem('diagnosisPoints');
	const diagnosisPointsInt = diagnosisPoints
		? Number.parseInt(diagnosisPoints)
		: 0;

	if (diagnosisPointsInt >= 0)
		result = 'Com certeza é só uma ressaca. Beba água! 💧';
	else if (diagnosisPointsInt <= -1 && diagnosisPointsInt >= -3)
		result = 'Ixi, melhor dar uma olhada. Pode ser uma DST! 💉';
	else if (diagnosisPointsInt <= -4 && diagnosisPointsInt >= -6)
		result = 'VÁ A UM MÉDICO! Deve ser uma DST! 🚨';
	else if (diagnosisPointsInt < -6)
		result = 'CORRA PARA UM MÉDICO! CERTEZA QUE É DST! ☠️';

	return (
		<>
			<Header />
			<main className="h-dvh flex flex-col gap-4 items-center p-4 ">
				<h1 className="text-4xl font-bold">Diagnóstico:</h1>
				<div className="bg-zinc-50 shadow-md border rounded-md p-6">
					<p className="text-xl text-center font-semibold">{result}</p>
				</div>
				<div className="flex justify-center gap-4 flex-wrap">
					<Button variant={'green'} asChild>
						<Link href={'/'}>
							Página inicial <House />
						</Link>
					</Button>
					<Button variant={'amber'} asChild>
						<Link href={'/diagnosis/1'}>
							Refazer <RotateCcw />
						</Link>
					</Button>
					<Button variant={'red'} asChild>
						<Link href={'/pharmacies'}>
							<Hospital />
						</Link>
					</Button>
				</div>
			</main>
			<Footer />
		</>
	);
}
