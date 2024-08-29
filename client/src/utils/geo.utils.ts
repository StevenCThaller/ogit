export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const EARTH_RADIUS_METERS = 6371e3;

  const lat1Rads = lat1 * (Math.PI / 180);
  const lat2Rads = lat2 * (Math.PI / 180);
  const deltaLatRads = (lat2 - lat1) * (Math.PI / 180);
  const deltaLngRads = (lng2 - lng1) * (Math.PI / 180);

  // Haversine formula
  const a =
    Math.sin(deltaLatRads / 2) ** 2 +
    Math.cos(lat1Rads) * Math.cos(lat2Rads) * Math.sin(deltaLngRads / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_METERS * c;
}

export function calculateRadiusFromMapBoundaries(
  north: number,
  south: number,
  east: number,
  west: number
): number {
  const centerLat = (north + south) / 2;
  const centerLng = (east + west) / 2;

  const distNorth = calculateDistance(centerLat, centerLng, north, centerLng);
  const distEast = calculateDistance(centerLat, centerLng, centerLat, east);

  const radius = Math.max(distNorth, distEast);

  return radius;
}
