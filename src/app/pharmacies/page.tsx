'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./map'), { ssr: false });

export default function Pharmacies() {
	return (
		<>
			<Header />
			<main className="p-4">
				<h1 className="text-2xl font-bold text-center mb-4">Farmácias próximas</h1>
				<DynamicMap
					center={[-23.550164466, -46.633664132]} // Praça da Sé
					zoom={15}
				/>
			</main>
			<Footer />
		</>
	);
}
