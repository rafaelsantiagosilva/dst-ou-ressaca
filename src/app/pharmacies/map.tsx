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

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			() => {
				// const lat = position.coords.latitude;
				// const lon = position.coords.longitude;
				buscarFarmacias(-23.008011229111542, -46.84634048809668);
			},
			(err) => setError('Erro ao obter localização: ' + err.message),
			{ enableHighAccuracy: true }
		);
	}, []);

	const buscarFarmacias = (lat: number, lon: number) => {
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
			.then((data) => setPharmacies(data.elements))
			.catch(() =>
				setError(
					'Erro ao buscar as farmácias, devem ser os hackers argentinos. Tente novamente mais tarde.'
				)
			);
	};

	return (
		<div>
			{error && <p className="text-red-500 font-semibold text-xl mb-4">{error}</p>}

			<MapContainer
				className="mx-auto border-4 border-slate-900 rounded-md"
				center={center}
				zoom={zoom}
				style={style}
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Marker
					position={userPosition}
					alt="Imagem verde, com area verde em sua volta, para representar sua localização"
					title="Localização Atual"
					riseOnHover
					icon={userLocationIconMarker}
				>
					<Popup>Você está aqui!</Popup>
				</Marker>
				{pharmacies?.map((pharmacy) => {
					const position = (function () {
						if (pharmacy.center)
							return [pharmacy.center.lat, pharmacy.center.lon] as LatLngExpression;

						return [pharmacy.lat, pharmacy.lon] as LatLngExpression;
					})();

					return (
						<Marker
							position={position}
							alt="Pino vermelho de localização para exibir a farmácia"
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
										{pharmacy.tags['addr:street']}{' '}
										{pharmacy.tags['addr:housenumber'] &&
											pharmacy.tags['addr:housenumber']}
									</small>
								)}
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
}
