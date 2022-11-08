export const fetchMeteors = async () => {
  const res = await fetch('https://data.nasa.gov/resource/y77d-th95.json');
  const data = await res.json();
  return data;
};
