export interface IPharmacy {
  id: number;
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags: {
    name?: string;
    'addr:street'?: string;
    'addr:housenumber'?: string;
  };
}