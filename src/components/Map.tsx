import { useState } from "react";
import { PointyClicky } from "./PointClicked";
import { AreaZonePolygonSelection } from "./PolygonArea";

export const Map: React.FC = () => {
  const [coords, setCoords] = useState<{ x: number; y: number }[]>([]);
  const [isPolygonDrawn, setIsPolygonDrawn] = useState<boolean>(false);
  const [pointsOnMap, setPointsOnMap] = useState<React.ReactNode[]>([]);
  const findThePoint = [
    { x: 300, y: 250 },
    { x: 400, y: 50 },
  ];

  const isAInRangeOfB = (
    a: { x: number; y: number },
    b: { x: number; y: number },
    pixelsRange: number
  ) =>
    a.x > b.x - pixelsRange &&
    a.x < b.x + pixelsRange &&
    a.y > b.y - pixelsRange &&
    a.y < b.y + pixelsRange
      ? true
      : false;

  const checkIfPointInsidePolygon = (
    point: { x: number; y: number },
    polygon: { x: number; y: number }[]
  ) => {
    let isIn = false;
    for (var i = 0; i < polygon.length - 1; ++i) {
      const coord0 = polygon[i],
        coord1 = polygon[i + 1];
      if (
        point.y < coord0.y !== point.y < coord1.y &&
        point.x <
          ((coord1.x - coord0.x) * (point.y - coord0.y)) /
            (coord1.y - coord0.y) +
            coord0.x
      ) {
        isIn = !isIn;
      }
    }

    if (isIn) {
      return point;
    }
  };

  const handleMapClick = (e: any) => {
    if (!isPolygonDrawn) {
      setCoords((prev) => [...prev, { x: e.clientX, y: e.clientY }]);
      setPointsOnMap((prev) => [
        ...prev,
        <PointyClicky
          key={`guidance_point${prev.length}`}
          marginL={e.clientX}
          marginT={e.clientY}
          pinpointRadius={5}
        />,
      ]);
    }
    const firstCoords = coords[0];
    if (
      firstCoords &&
      isAInRangeOfB({ x: e.clientX, y: e.clientY }, firstCoords, 10)
    ) {
      setCoords((prev) => [...prev, firstCoords]);
      setIsPolygonDrawn(true);
      setPointsOnMap([]);
    }

    if (isPolygonDrawn) {
      setCoords([]);
      setIsPolygonDrawn(false);
    }
  };
  return (
    <div
      onClick={(e) => {
        handleMapClick(e);
      }}
      style={{
        background: `url('/map.jpg')`,
        width: `${888}px`,
        height: `${564}px`,
        zIndex: "1",
      }}
    >
      {findThePoint.map((points) => (
        <PointyClicky
          marginL={points.x}
          marginT={points.y}
          pinpointRadius={10}
          style={{
            backgroundColor:
              checkIfPointInsidePolygon(points, coords) && isPolygonDrawn
                ? "blue"
                : "rgba(0, 255, 85, 0.2)",
          }}
        />
      ))}
      {pointsOnMap}
      {isPolygonDrawn && (
        <AreaZonePolygonSelection
          coords={coords}
          imageHeight={564}
          imageWidth={888}
        />
      )}
    </div>
  );
};
