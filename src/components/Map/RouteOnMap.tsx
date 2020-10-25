import React from "react";
import { Polyline } from "react-leaflet";
import GlobalContext from "../../context/GlobalContext";
import decodePolyline from "decode-google-map-polyline";
import theme from "../../themes/theme";
const RouteOnMap = () => {
  const { currentRoute } = React.useContext(GlobalContext);

  if (!currentRoute.coordinates) {
    return <></>;
  }

  const coordinates: any = decodePolyline(currentRoute.coordinates);

  return (
    <Polyline
      positions={coordinates}
      weight={8}
      color={currentRoute.color || theme.color.black}
    />
  );
};

export default RouteOnMap;
