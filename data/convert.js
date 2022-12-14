const fs = require("fs");
const path = require("path");
const clusters = require("./cluster.json");

const DESCRIPTIONS = [
    "Opposite the food court",
    "Behind the air-con units",
    "Behind the vending machines",
    "Beside the piano",
    "Beside staff offices",
    "Beside the Labs",
    "Beside the library",
];
const CLEANLINESS = 0;
const TOILET_TYPE = {
    MALE: "MALE",
    FEMALE: "FEMALE",
    HANDICAP: "HANDICAP",
};
const UTILITIES = {
    SHOWERS: "SHOWERS",
    FRAGRANCE: "FRAGRANCE",
    BIDETS: "BIDETS",
    WATERCOOLER: "WATERCOOLER",
};

const toilets = [];

const getRandomElement = (arr) => {
    const randomIdx = Math.floor(Math.random() * arr.length);
    return arr[randomIdx];
};

const isAdd = (element) => {
    return Math.random() < 0.5 ? [element] : [];
};

const generateToiletsFromFloors = (
    floors,
    building,
    longitude,
    latitude,
    gender
) => {
    const toilets = [];
    for (const floor of floors) {
        const toilet = {
            building,
            description: getRandomElement(DESCRIPTIONS),
            floor,
            longitude,
            latitude,
            num_seats: Math.floor(Math.random() * 3) + 1,
            num_squats: Math.floor(Math.random() * 3) + 1,
            cleanliness: CLEANLINESS,
            type: TOILET_TYPE[gender],
            utilities: [
                ...isAdd(UTILITIES.SHOWERS),
                ...isAdd(UTILITIES.BIDETS),
                ...isAdd(UTILITIES.FRAGRANCE),
                ...isAdd(UTILITIES.WATERCOOLER),
            ],
        };

        // generate a random utility
        if (toilet.utilities.length === 0) {
            const utilities = Object.values(UTILITIES);
            const idx = Math.floor(Math.random * utilities.length) + 1;
            toilet.utilities.push(utilities[idx]);
        }

        toilets.push(toilet);
    }
    return toilets;
};

for (const { name, location, floors } of clusters) {
    const building = name;
    const [latitude, longitude] = location;
    const { Male: male, Female: female, Handicap: handicap } = floors;
    if (male !== undefined)
        toilets.push(
            ...generateToiletsFromFloors(
                male,
                building,
                longitude,
                latitude,
                "MALE"
            )
        );
    if (female !== undefined)
        toilets.push(
            ...generateToiletsFromFloors(
                female,
                building,
                longitude,
                latitude,
                "FEMALE"
            )
        );
    if (handicap !== undefined)
        toilets.push(
            ...generateToiletsFromFloors(
                handicap,
                building,
                longitude,
                latitude,
                "HANDICAP"
            )
        );
}

fs.writeFileSync(
    path.join(__dirname, "./toilets.json"),
    JSON.stringify(toilets, null, 2)
);
