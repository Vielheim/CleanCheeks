import { Op } from 'sequelize';
import { ICoordinates } from '../../../api/interfaces/coordinates.interface';
import { RatingTypeUtil } from '../../../enums/ToiletRatingEnums';
import { DataNotFoundError } from '../../../errors/Errors';
import { Toilet, ToiletPreference } from '../../models';
import { IToiletOutput } from '../../models/Toilet';
import ToiletRating from '../../models/ToiletRating';
import { isPointInCircle } from '../../utilities/distance';
import IPoint from '../../utilities/Point.interface';

const getById = async (id: string): Promise<Toilet> => {
  const toilet = await Toilet.findByPk(id);

  if (!toilet) {
    throw new DataNotFoundError(`Toilet with id ${id} not found!`);
  }

  return toilet;
};

export const updateToiletRating = async ({
  toilet_id,
  type,
}: ToiletRating): Promise<IToiletOutput> => {
  const addedRating = RatingTypeUtil.getValue(type);

  const toilet = await getById(toilet_id);
  const newRatingCount = toilet.num_ratings + 1;
  const newRating =
    toilet.cleanliness * (toilet.num_ratings / newRatingCount) +
    addedRating * (1 / newRatingCount);

  return toilet.update({
    cleanliness: Math.floor(newRating * 100) / 100,
    num_ratings: newRatingCount,
  });
};

// Get all neighbouring toilets with optionally a user's preference of the toilet
export const getAllNeighbouringToiletsByCoordinates = async (
  coordinates: ICoordinates,
  userId?: string
): Promise<IToiletOutput[]> => {
  const toilets_with_preference: IToiletOutput[] = await Toilet.findAll({
    include: {
      model: ToiletPreference,
      as: 'toiletPreferences',
      where: {
        user_id: {
          [Op.eq]: userId, // ignored if undefined
        },
      },
      required: false, // Use outer join to include all toilets
    },
  });

  // Check if toilet is within a radius from the center
  const center: IPoint = {
    x: coordinates.latitude,
    y: coordinates.longitude,
  };

  const results = toilets_with_preference.filter((toilet) => {
    const toiletPoint: IPoint = {
      x: toilet.latitude,
      y: toilet.longitude,
    };

    return isPointInCircle(toiletPoint, center, coordinates.radius);
  });

  return results;
};

export const getToiletsWithUserPreferences = async (
  userId: string
): Promise<IToiletOutput[]> => {
  return await Toilet.findAll({
    include: {
      model: ToiletPreference,
      as: 'toiletPreferences',
      where: {
        user_id: {
          [Op.eq]: userId, // ignored if undefined
        },
      },
      required: true, // Use outer join to include all toilets
    },
  });
};

export const getToiletsOrderByCleanlinessDesc = async (): Promise<{
  toilets: IToiletOutput[];
  count: number;
}> => {
  const { rows, count } = await Toilet.findAndCountAll({
    order: [['cleanliness', 'DESC']],
  });
  return {
    toilets: rows,
    count,
  };
};
