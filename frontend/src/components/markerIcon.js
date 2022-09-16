import L from 'leaflet';

import './markerIcon.scss';

const getSvgCircle = (numSections, numGreen, isTransparent) => {
  const RADIUS = 4;
  const PI = 3.14;
  const DIAMETER = 2 * PI * RADIUS;
  const sectionLength = DIAMETER / numSections;
  const greenLength = numGreen * sectionLength;
  const redLength = DIAMETER - greenLength;
  const opacity = isTransparent ? 0.7 : 1;
  
  const svgCircle = `
    <svg viewbox="0 0 10 10" fill="transparent" opacity="${opacity}">
      <defs>
        <circle id="circle" cx="5" cy="5" r="4" stroke-width="1" fill="white" transform="rotate(270, 5, 5)" />
      </defs>
      <use xlink:href="#circle" stroke="#EB1D36" stroke-dasharray="${redLength}, ${greenLength}"  />
      <use xlink:href="#circle" stroke="green"
        stroke-dasharray="0, ${redLength}, ${greenLength}, 0" />
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="black" font-size="4">${numSections}</text>
    </svg>
  `;

  return svgCircle;
};

const getMarkerIcon = (numSections, numGreen, isTransparent = false) => L.divIcon({
  html: getSvgCircle(numSections, numGreen, isTransparent),
  iconSize: [40, 40],
  className: "leaflet-div-icon",
});

export default getMarkerIcon;
