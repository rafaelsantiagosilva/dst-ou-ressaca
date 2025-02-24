'use client';

import { IPharmacy } from '@/interfaces/IPharmacy';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import {
	MapContainer,
	MapContainerProps,
	Marker,
	Popup,
	TileLayer,
} from 'react-leaflet';

interface MapProps extends MapContainerProps {
	pharmacies?: IPharmacy[];
	userPosition: LatLngExpression;
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

export function Map({
	center,
	zoom,
	style = { height: '500px', width: '70%' },
	userPosition,
}: MapProps) {
	const [pharmacies, setPharmacies] = useState<IPharmacy[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [noPharmacies, setNoPharmacies] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lat = position.coords.latitude;
				const lon = position.coords.longitude;
				searchPharmacies(lat, lon);
			},
			(err) => {
				if (err.code === err.PERMISSION_DENIED) {
					setError(
						'Ei cara! Habilita a localização ai. Prometo que só vou compartilhar com profissionais.'
					);
				} else {
					setError('Erro ao obter localização: ' + err.message);
				}
			},
			{ enableHighAccuracy: true }
		);
	}, []);

	const searchPharmacies = (lat: number, lon: number) => {
		const query = `
      [out:json];
      (
        node["amenity"="pharmacy"](around:10000, ${lat}, ${lon});
        way["amenity"="pharmacy"](around:10000, ${lat}, ${lon});
        relation["amenity"="pharmacy"](around:5000, ${lat}, ${lon});
      );
      out center;
    `;

		fetch(
			'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query)
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.elements.length === 0) {
					setNoPharmacies(true);
				} else {
					setPharmacies(data.elements);

					if (pharmacies.length === 0)
						setError(
							'Aparentemente você mora em Xique-Xique (BA) e não há farmácias por perto.'
						);

					setNoPharmacies(false);
					setIsLoading(false);
				}
			})
			.catch(() =>
				setError(
					'Erro ao buscar as farmácias, devem ser os hackers argentinos. Tente novamente mais tarde.'
				)
			);
	};

	return (
		<div className="h-dvh">
			{error && <p className="text-red-500 font-semibold text-xl mb-4">{error}</p>}
			{noPharmacies && !error && (
				<p className="text-yellow-500 font-semibold text-xl mb-4">
					Nenhuma farmácia encontrada na sua área.
				</p>
			)}

			{isLoading ? (
				<div className="h-full font-bold text-xl text-center">Carregando...</div>
			) : (
				!error && (
					<MapContainer
						className="mx-auto border-4 border-slate-900 rounded-md"
						center={center}
						zoom={zoom}
						style={style}
					>
						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
						<Marker
							position={userPosition}
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
				)
			)}
		</div>
	);
}
