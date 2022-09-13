import { PreferenceType } from '../../enums';

export interface IPreference {
  user_id: string;
  toilet_id: string;
  type: PreferenceType;
  createdAt: Date;
  updatedAt: Date;
}
