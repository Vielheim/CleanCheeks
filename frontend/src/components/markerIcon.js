import L from 'leaflet';

import './markerIcon.scss';

const getSvgCircle = (numSections, numGreen) => {
  console.log(numGreen)
  const RADIUS = 4;
  const PI = 3.14;
  const DIAMETER = 2 * PI * RADIUS;
  const sectionLength = DIAMETER / numSections;
  const greenLength = numGreen * sectionLength;
  const redLength = DIAMETER - greenLength;

  const svgCircle = `
    <svg viewbox="0 0 10 10" fill="transparent">
      <defs>
        <circle id="circle" cx="5" cy="5" r="4" stroke-width="0.5" fill="white" />
      </defs>
      <use xlink:href="#circle" stroke="pink" stroke-dasharray="${redLength}, ${greenLength}" transform="rotate(270, 5, 5)" />
      <use xlink:href="#circle" stroke="green"
        stroke-dasharray="0, ${redLength}, ${greenLength}, 0" transform="rotate(270, 5, 5)" />
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="black" font-size="5">${numSections}</text>
    </svg>
  `;

  return svgCircle;
};

const getMarkerIcon = (numSections, numGreen) => L.divIcon({
  html: getSvgCircle(numSections, numGreen),
  iconSize: [40, 40],
  className: "leaflet-div-icon",
});

export default getMarkerIcon;
