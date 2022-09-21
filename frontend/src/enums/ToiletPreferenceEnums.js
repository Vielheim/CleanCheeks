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
