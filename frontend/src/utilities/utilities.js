import Flatbush from 'flatbush';

export class NeighboursIndex {
	// Find all toilets 400m away from location
	MAX_DISTANCE = 0.004;
	
	constructor(toilets) {
		this.toiletsIndex = new Flatbush(toilets.length);
  	toilets.forEach(({ longitude, latitude }) => {
			this.toiletsIndex.add(longitude, latitude, longitude, latitude);
		});
  	this.toiletsIndex.finish();
	}

	query(longitude, latitude) {
		return this.toiletsIndex.neighbors(longitude, latitude, Infinity, this.MAX_DISTANCE);
	}
}