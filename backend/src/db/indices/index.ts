import { injectable } from 'inversify';
import 'reflect-metadata'; // ONLY IMPORT THIS ONCE
import KDBush from 'kdbush';
import { Toilet } from '../models';

interface Point {
  x: number;
  y: number;
}

@injectable()
class NeighbouringToiletsIndex {
  DEFAULT_RADIUS = Number.MAX_SAFE_INTEGER;
  toiletsIndex!: KDBush<Point>;

  async generateIndices() {
    const points: Point[] = (await Toilet.findAll()).map((toilet) => {
      return {
        x: toilet.latitude,
        y: toilet.longitude,
      };
    });

    this.toiletsIndex = new KDBush(
      points,
      (p) => p.x,
      (p) => p.y
    );

    console.log(`Generated ${this.toiletsIndex.ids.length} indices`);
  }

  query(latitude: number, longitude: number, radius: number) {
    let final_radius = radius;

    if (Number.isNaN(final_radius)) {
      final_radius = this.DEFAULT_RADIUS;
    }

    return this.toiletsIndex.within(latitude, longitude, final_radius);
  }
}

export { NeighbouringToiletsIndex };
