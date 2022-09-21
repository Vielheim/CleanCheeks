import L from 'leaflet';

import styles from './markerIcon.module.scss';

const getSvgCircle = (numGreen, numYellow, numRed, isTransparent) => {
  const RADIUS = 4;
  const PI = 3.14;
  const DIAMETER = 2 * PI * RADIUS;
  const numSections = numGreen + numYellow + numRed;
  const sectionLength = DIAMETER / numSections;
  const greenLength = numGreen * sectionLength;
  const redLength = numRed * sectionLength;
  const yellowLength = numYellow * sectionLength;
  
  const opacity = isTransparent ? 0.7 : 1;

  const svgCircle = `
    <svg viewbox="0 0 10 10" fill="transparent" opacity="${opacity}">
      <defs>
        <circle id="circle" cx="5" cy="5" r="4" fill="transparent" transform="rotate(270, 5, 5)" />
      </defs>
      <use xlink:href="#circle" stroke="#EB1D36" stroke-dasharray="${redLength}, ${yellowLength + greenLength}"  />
      <use xlink:href="#circle" stroke="#FFDE00" stroke-dasharray="0 ${redLength}, ${yellowLength} ${greenLength}"  />
      <use xlink:href="#circle" stroke="#367E18" stroke-dasharray="0, ${redLength + yellowLength}, ${greenLength}, 0" />
      <circle cx="5" cy="5" r="3.5" fill="white" />
        
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="black" font-size="4">${numSections}</text>
    </svg>
  `;

  return svgCircle;
};

const getMarkerIcon = (numGreen, numYellow, numRed, isTransparent = false) =>
  L.divIcon({
    html: getSvgCircle(numGreen, numYellow, numRed, isTransparent),
    iconSize: [40, 40],
    className: styles['leaflet-div-icon'],
  });

export default getMarkerIcon;
