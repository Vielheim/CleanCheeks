export const getDistance = (fLat, fLon, sLat, sLon) => {
  const straight =
    (Math.abs(fLat - sLat) ** 2 + Math.abs(fLon - sLon) ** 2) ** 0.5;
  return (straight * 110000).toFixed(1);
};

export const fmtDistance = (distance) =>
  distance >= 1000 ? `${(distance / 1000).toFixed(1)}km` : `${distance}m`;