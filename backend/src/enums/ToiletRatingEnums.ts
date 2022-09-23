export enum RatingType {
  CLEAN = 'CLEAN',
  DIRTY = 'DIRTY',
}

export class RatingTypeUtil {
  static getValue(type: RatingType): number {
    switch (type) {
      case RatingType.CLEAN:
        return 1;
      case RatingType.DIRTY:
        return -1;
    }
  }
}
