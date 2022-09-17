const API = '/api/v1';

export const fetchCloseToilets = async (coordinates, radius) =>
fetch(
  `${API}/toilets/neighbours?latitude=${coordinates[0]}&longitude=${coordinates[1]}&radius=${radius}`
)
  .then((response) => response.json())
  .catch((error) => console.log(error));