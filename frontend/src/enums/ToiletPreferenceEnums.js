export const PreferenceType = {
  BLACKLIST: 'BLACKLIST',
  FAVOURITE: 'FAVOURITE',
};

export const getPreferenceTypeDisplay = (preferenceType) => {
  if (preferenceType === PreferenceType.BLACKLIST) {
    return 'BLACKLISTED';
  } else if (preferenceType === PreferenceType.FAVOURITE) {
    return 'FAVOURITED';
  }
};

export const getOrder = (preferenceType) => {
  if (preferenceType === PreferenceType.FAVOURITE) {
    return 0;
  } else if (preferenceType === PreferenceType.BLACKLIST) {
    return 2;
  }
  // No preference type
  return 1;
};
