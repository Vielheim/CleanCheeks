import Point from './Point.interface';

const DEFAULT_DISTANCE_METRES = 400;
const MAP_TO_DISTANCE_RATIO = 1 / 111000; // every 1 lat/long ~ 111,000 metres

// convert radius in metres to latitude/longitude (map) distances
const getMapDistanceFromMetres = (distance: number) => {
  let final_distance = distance;

  if (Number.isNaN(final_distance)) {
    final_distance = DEFAULT_DISTANCE_METRES;
  }

  return MAP_TO_DISTANCE_RATIO * final_distance;
};

const calculatePointsDistance = (point1: Point, point2: Point): number => {
  const x_sq = Math.pow(point1.x - point2.x, 2);
  const y_sq = Math.pow(point1.y - point2.y, 2);
  return Math.sqrt(x_sq + y_sq);
};

const isPointInCircle = (
  point: Point,
  center: Point,
  radius: number
): boolean => {
  const mapRadius = getMapDistanceFromMetres(radius);
  const mapDistance = calculatePointsDistance(point, center);

  return mapDistance <= mapRadius;
};

export { isPointInCircle };
