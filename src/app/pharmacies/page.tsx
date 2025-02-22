import { Header } from '@/components/header';
import { Map } from './map';
import { Footer } from '@/components/footer';

export default function Pharmacies() {
	return (
		<>
			<Header />
			<main className="p-4">
				<h1 className="text-2xl font-bold text-center mb-4">Farmácias próximas</h1>
				<Map
					center={[-23.008011229111542, -46.84634048809668]}
					userPosition={[-23.008011229111542, -46.84634048809668]}
					zoom={15}
				/>
			</main>
			<Footer />
		</>
	);
}
