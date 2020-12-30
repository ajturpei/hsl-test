import React from "react";
import GlobalContext from "../context/GlobalContext";
import OverlayView from "./OverlayView";

const GeoLocate = ({ children }: any) => {
  const { setGeoLocation } = React.useContext(GlobalContext);

  const [showOverlay, setShowOverlay] = React.useState(false);

  React.useEffect(() => {
    const success = ({ coords }: any) => {
      setGeoLocation({
        lat: Number(coords.latitude.toFixed(4)),
        lng: Number(coords.longitude.toFixed(4)),
      });
    };
    const error = () => {
      setShowOverlay(true);
    };

    let watcher: any;
    if (navigator.geolocation) {
      setShowOverlay(false);
      watcher = navigator.geolocation.watchPosition(success, error, {
        enableHighAccuracy: true,
      });
    }
    return () => {
      if (navigator.geolocation && watcher) {
        navigator?.geolocation?.clearWatch(watcher);
      }
    };
  }, [setGeoLocation, setShowOverlay]);

  if (showOverlay) {
    return <OverlayView />;
  }
  return <>{children}</>;
};

export default GeoLocate;
