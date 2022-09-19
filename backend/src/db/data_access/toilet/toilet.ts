import { DataNotFoundError } from '../../../errors/Errors';
import { Toilet, ToiletPreference } from '../../models';
import { IToiletInput, IToiletOutput } from '../../models/Toilet';
import { GetAllToiletsFilters, isEmptyGetAllToiletFilters } from './types';
import { Op, Sequelize } from 'sequelize';
import { ICoordinates } from '../../../api/interfaces/coordinates.interface';
import injection_container from '../../indices/config';
import { NeighbouringToiletsIndex } from '../../indices';
import TYPES from '../../indices/types';
import ToiletRating from '../../models/ToiletRating';
import { RatingTypeUtil } from '../../../enums/ToiletRatingEnums';

export const create = async (payload: IToiletInput): Promise<IToiletOutput> => {
  const toilet = await Toilet.create(payload);
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

export const update = async (
  id: string,
  payload: Partial<IToiletInput>
): Promise<IToiletOutput> => {
  const toilet = await getById(id);

  const updatedToilet = await toilet.update(payload);
  return updatedToilet;
};

export const deleteById = async (id: string): Promise<boolean> => {
  const deletedToiletCount = await Toilet.destroy({
    where: { id: id },
  });

  return !!deletedToiletCount;
};

export const getById = async (id: string): Promise<Toilet> => {
  const toilet = await Toilet.findByPk(id);

  if (!toilet) {
    throw new DataNotFoundError(`Toilet with id ${id} not found!`);
  }

  return toilet;
};

export const getAll = async (
  filters: GetAllToiletsFilters
): Promise<IToiletOutput[]> => {
  // No filters specified; return all
  if (isEmptyGetAllToiletFilters(filters)) {
    return Toilet.findAll();
  }

  // Extract existing filters and perform query

  // The ToiletType is in the filters array
  let typesFilter = {};
  if (filters.type) {
    typesFilter = {
      type: {
        [Op.in]: filters.type,
      },
    };
  }

  // One of the Utilities is in in the filters array
  let utilitiesFilter = {};
  if (filters.utilities) {
    utilitiesFilter = {
      utilities: {
        [Op.overlap]: filters.utilities,
      },
    };
  }

  return Toilet.findAll({
    where: Sequelize.or(typesFilter, utilitiesFilter),
  });
};

// Get all toilets with optionally a user's preference of the toilet
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

  const neighbouringToiletsIndex: NeighbouringToiletsIndex =
    injection_container.get<NeighbouringToiletsIndex>(
      TYPES.NeighbouringToiletsIndex
    );

  const results = neighbouringToiletsIndex
    .query(coordinates.latitude, coordinates.longitude, coordinates.radius)
    .map((idx) => toilets_with_preference[idx]);

  return results;
};