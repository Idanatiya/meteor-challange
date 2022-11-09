import { ApiMeteor, Meteor } from '@/types';
import { formateDate } from '@/utils';

export const API_URL = 'https://data.nasa.gov/resource/y77d-th95.json';

export const fetchMeteors = async () => {
  const res = await fetch(API_URL);
  const meteorsData: ApiMeteor[] = await res.json();

  const meteorsKeyById = meteorsData.reduce((collection, currMeteor) => {
    const { id, year, mass, ...rest } = currMeteor;
    if (!year || !mass) return collection;
    return {
      ...collection,
      [id]: {
        ...rest,
        year: formateDate(year),
        id,
        mass: +mass,
      },
    };
  }, {} as Record<string, Meteor>);

  return meteorsKeyById;
};
