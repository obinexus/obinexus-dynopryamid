export const calculateIsometricCoordinates = (x, y, z) => ({
  x: x - z * 0.5,
  y: y + z * 0.25
});

export const getLevelDimensions = (level, config = {}) => {
  const {
    baseWidth = 400,
    pyramidHeight = 400,
    totalLevels = 11,
    shrinkFactor = 0.09
  } = config;
  
  const levelHeight = pyramidHeight / totalLevels;
  const y = pyramidHeight - (level + 1) * levelHeight + 100;
  const width = baseWidth * (1 - shrinkFactor * level);
  const xOffset = (baseWidth - width) / 2 + 200;
  
  return { y, width, xOffset, levelHeight };
};
