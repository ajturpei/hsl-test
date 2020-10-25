import React from "react";
import GlobalContext from "../context/GlobalContext";
import OverlayView from "./OverlayView";

const GeoLocate = () => {
  const { setGeoLocation, setInitialLocation } = React.useContext(
    GlobalContext
  );
  const [showOverlay, setShowOverlay] = React.useState(false);

  React.useEffect(() => {
    let watcher: any;
    if (!navigator.geolocation) {
      setShowOverlay(true);
    }
    if (navigator.geolocation) {
      setShowOverlay(false);
      watcher = navigator.geolocation.watchPosition(({ coords }) => {
        setGeoLocation({ lat: coords.latitude, lng: coords.longitude });
      });
    }
    return () => {
      if (navigator.geolocation && watcher) {
        navigator?.geolocation?.clearWatch(watcher);
      }
    };
  }, [setGeoLocation]);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setInitialLocation({ lat: coords.latitude, lng: coords.longitude });
    });
  }, [setInitialLocation]);

  if (showOverlay) {
    return <OverlayView />;
  }
  return <></>;
};

export default GeoLocate;
