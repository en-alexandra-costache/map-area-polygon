import { useState } from "react";
import { PointyClicky } from "./PointClicked";
import { AreaZonePolygonSelection } from "./PolygonArea";

export const Map: React.FC = () => {
  const [coords, setCoords] = useState<{ x: number; y: number }[]>([]);
  const [isPolygonDrawn, setIsPolygonDrawn] = useState<boolean>(false);
  const [pointsOnMap, setPointsOnMap] = useState<React.ReactNode[]>([]);
  const findThePoint = { x: 300, y: 250 };

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
    for (var i = 0; i < polygon.length - 1; ++i) {
      const coord0 = polygon[i],
        coord1 = polygon[i + 1];

      if (
        point.y < coord0.y != point.y < coord1.y &&
        point.x <
          ((coord1.x - coord0.x) * (point.y - coord0.y)) /
            (coord1.y - coord0.y) +
            coord0.x
      ) {
        return point;
      }
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
      console.log(checkIfPointInsidePolygon(findThePoint, coords));
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
      <PointyClicky
        marginL={findThePoint.x}
        marginT={findThePoint.y}
        pinpointRadius={10}
      />
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
