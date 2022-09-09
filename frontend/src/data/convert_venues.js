const fs = require("fs");
const path = require("path");
const venuesKeyById = require("./venues_raw.json");

const venues = [];

for (const [key, value] of Object.entries(venuesKeyById)) {
  const venue = {
    id: key,
    ...value,
  };
  venues.push(venue);
}

fs.writeFileSync(
  path.join(__dirname, "./venues.json"),
  JSON.stringify(venues, null, 2)
);