import { toReadableTime } from "seconds-since-midnight";
import config from "../utils/config";
import theme from "../themes/theme";

// HSL API reports times seconds after midnight
export const getTime24h = (timeSinceMidnight: number) => {
  const { hours, minutes, meridian } = toReadableTime(timeSinceMidnight);
  if (meridian === "PM") {
    return `${parseInt(hours) + 12}.${minutes}`;
  }
  return `${hours === "12" ? "0" : hours}.${minutes}`;
};

// HSL Codes for different transportation vehicles mapped to name and color
export const getTransportationType = (transportType: number) => {
  switch (transportType) {
    case 0:
      return { transportName: "Tram", color: theme.color.hslGreen };
    case 1:
      return { transportName: "Metro", color: theme.color.hslOrange };
    case 2:
      return { transportName: "Train", color: theme.color.hslPurple };
    case 3:
      return { transportName: "Bus", color: theme.color.hslBlue };
    case 4:
      return { transportName: "Ferry", color: theme.color.hlsLightBlue };
    default:
      return { transportName: "Unknown", color: theme.color.orange };
  }
};

// parse radius from localStorage value or return one from config
export const getDefaultRadius = () => {
  const radius: string | null = localStorage?.getItem("HSLTestRadius");
  if (radius && !isNaN(parseInt(radius))) {
    const radiusInt: number = parseInt(radius);
    return radiusInt > config.maxRadius ? config.maxRadius : radiusInt;
  }
  return config.initialRadius;
};
