import Flatbush from 'flatbush';

export class NeighboursIndex {
	// Find all toilets 400m away from location
	MAX_DISTANCE = 0.004;
	
	constructor(toilets) {
		this.toiletsIndex = new Flatbush(toilets.length);
  	toilets.forEach(({ latitude, longitude }) => {
			this.toiletsIndex.add(latitude, longitude, latitude, longitude);
		});
  	this.toiletsIndex.finish();
	}

	query(latitude, longitude) {
		return this.toiletsIndex.neighbors(latitude, longitude, Infinity, this.MAX_DISTANCE);
	}
}