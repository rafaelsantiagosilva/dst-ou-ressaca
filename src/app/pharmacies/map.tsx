'use client';

import { IPharmacy } from '@/interfaces/IPharmacy';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useCallback } from 'react';
import {
	MapContainer,
	MapContainerProps,
	Marker,
	Popup,
	TileLayer,
} from 'react-leaflet';

interface MapProps extends MapContainerProps {
	pharmacies?: IPharmacy[];
}

const userLocationIconMarker = new Icon({
	iconUrl: '/location.png',
	iconSize: [64, 64],
	iconAnchor: [64, 64],
	popupAnchor: [-32, -64],
});

const pharmacyIcon = new Icon({
	iconUrl: '/pin.png',
	iconSize: [64, 64],
	iconAnchor: [64, 64],
	popupAnchor: [-32, -64],
});

export default function Map({
	style = { height: '500px', width: '70%' },
}: MapProps) {
	const [lat, setLat] = useState(0);
	const [lon, setLon] = useState(0);
	const [pharmacies, setPharmacies] = useState<IPharmacy[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const searchPharmacies = useCallback((lat: number, lon: number) => {
		const query = `
      [out:json];
      (
        node["amenity"="pharmacy"](around:7000, ${lat}, ${lon});
        way["amenity"="pharmacy"](around:7000, ${lat}, ${lon});
        relation["amenity"="pharmacy"](around:5000, ${lat}, ${lon});
      );
      out center;
    `;

		fetch(
			'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query)
		)
			.then((response) => response.json())
			.then((data) => {
				setPharmacies(data.elements);
				setIsLoading(false);
			})
			.catch(() =>
				setError(
					'Erro ao buscar as farmácias, devem ser os hackers argentinos. Tente novamente mais tarde.'
				)
			);
	}, []);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const fixedLat = position.coords.latitude;
				const fixedLon = position.coords.longitude;
				// const fixedLat = -23.550164466;
				// const fixedLon = -46.633664132;
				setLat(fixedLat);
				setLon(fixedLon);
				searchPharmacies(fixedLat, fixedLon);
			},
			(err) => {
				if (err.code === err.PERMISSION_DENIED) {
					setError(
						'Ei cara! Habilita a localização ai. Prometo que só vou compartilhar com profissionais.'
					);
				} else {
					setError('Erro ao obter localização: ' + err.message);
				}
				setIsLoading(false);
			},
			{ enableHighAccuracy: true }
		);
	}, [searchPharmacies, lat, lon]);

	return (
		<div className="h-dvh">
			{error && <p className="text-red-500 font-semibold text-xl mb-4">{error}</p>}
			{isLoading ? (
				<div className="h-full font-bold text-xl text-center">Carregando...</div>
			) : (
				<>
					{pharmacies.length === 0 && (
						<p className="font-semibold text-xl mb-4">
							Aparentemente você mora em Xique-Xique (BA) e não possui farmácias
							próximas de você!{' '}
						</p>
					)}
					{!error && (
						<MapContainer
							className="mx-auto border-4 border-slate-900 rounded-md"
							center={[lat, lon]}
							zoom={15}
							style={style}
						>
							<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
							<Marker
								position={[lat, lon] as LatLngExpression}
								alt="Sua localização"
								title="Localização Atual"
								riseOnHover
								icon={userLocationIconMarker}
							>
								<Popup>Você está aqui!</Popup>
							</Marker>

							{pharmacies.map((pharmacy) => {
								const position = pharmacy.center
									? [pharmacy.center.lat, pharmacy.center.lon]
									: [pharmacy.lat, pharmacy.lon];

								return (
									<Marker
										position={position as LatLngExpression}
										alt="Pino de farmácia"
										title={pharmacy.tags.name}
										riseOnHover
										icon={pharmacyIcon}
										key={pharmacy.id}
									>
										<Popup>
											<strong>{pharmacy.tags.name}</strong>
											<br />
											{pharmacy.tags['addr:street'] && (
												<small>
													{pharmacy.tags['addr:street']} {pharmacy.tags['addr:housenumber']}
												</small>
											)}
										</Popup>
									</Marker>
								);
							})}
						</MapContainer>
					)}
				</>
			)}
		</div>
	);
}
