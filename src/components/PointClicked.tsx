export const PointyClicky: React.FC<{
  marginL: number;
  marginT: number;
  pinpointRadius: number;
  style?: { [key: string]: unknown };
}> = ({ marginL, marginT, pinpointRadius, style }) => {
  return (
    <div
      style={{
        width: `${pinpointRadius * 2}px`,
        height: `${pinpointRadius * 2}px`,
        backgroundColor: "blue",
        marginLeft: `${marginL - pinpointRadius}px`,
        marginTop: `${marginT - pinpointRadius}px`,
        zIndex: "3",
        position: "absolute",
        ...style,
      }}
    />
  );
};
