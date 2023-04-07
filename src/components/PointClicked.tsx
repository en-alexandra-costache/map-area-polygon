export const PointyClicky: React.FC<{
  marginL: number;
  marginT: number;
  pinpointRadius: number;
}> = ({ marginL, marginT, pinpointRadius }) => {
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
      }}
    />
  );
};
