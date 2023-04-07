interface AreaZonePolygonSectionProps {
  coords: { x: number; y: number }[];
  imageHeight: number;
  imageWidth: number;
}

export const AreaZonePolygonSelection: React.FC<
  AreaZonePolygonSectionProps
> = ({ coords, imageHeight, imageWidth }) => {
  const polygonCoordsString = `${coords.map(
    (coordsSet, index) => `${coordsSet.x}px ${coordsSet.y}px `
  )}`;
  return (
    <div
      style={{
        clipPath: `polygon(${polygonCoordsString})`,
        position: "absolute",
        zIndex: "2",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(186, 0, 0, 0.7)",
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
        }}
      />
    </div>
  );
};
