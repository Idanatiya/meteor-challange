export interface ApiMeteor {
  name: string;
  id: string;
  nametype: string;
  recclass: string;
  mass: string;
  fall: string;
  year: string;
  reclat: string;
  reclong: string;
  geolocation: MeteorGeoLocation;
  ':@computed_region_cbhk_fwbd': string;
  ':@computed_region_nnqa_25f4': string;
}

export type Meteor = Omit<ApiMeteor, 'year' | 'mass'> & {
  year: number;
  mass: number;
};

interface MeteorGeoLocation {
  type: string;
  coordinates: number[];
}

export type Option = {
  key: string;
  value: number;
};
