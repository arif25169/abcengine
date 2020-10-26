export const minmax = (someArrayOfObjects, x,y,z) => {
  const valuesX = someArrayOfObjects.map( value => value[x] ).filter(Boolean);
  const valuesY = someArrayOfObjects.map( value => value[y] ).filter(Boolean);
  const valuesZ = someArrayOfObjects.map( value => value[z] ).filter(Boolean);

  return {
      minX: Math.min(...valuesX), 
      maxX: Math.max(...valuesX),
      minY: Math.min(...valuesY), 
      maxY: Math.max(...valuesY),
      minZ: Math.min(...valuesZ), 
      maxZ: Math.max(...valuesZ)
    };
};