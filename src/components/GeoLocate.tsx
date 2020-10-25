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

  const success = ({ coords }: any) => {
    setInitialLocation({ lat: coords.latitude, lng: coords.longitude });
  };
  const error = () => {
    setShowOverlay(true);
  };
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
    });
  }, []);

  if (showOverlay) {
    return <OverlayView />;
  }
  return <></>;
};

export default GeoLocate;
