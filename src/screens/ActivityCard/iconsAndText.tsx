import { BuildingIcon } from "../../assets/icons/BuildingIcon";
import { InfoIcon } from "../../assets/icons/InfoIcon";
import { MapMarkerIcon } from "../../assets/icons/MapMarkerIcon";
import { Activity } from "../../utility/types";

export const iconsAndText = (activityInfo: Activity) => [
  {
    icon: <MapMarkerIcon />,
    text: activityInfo.city,
  },
  {
    icon: <BuildingIcon style={{ paddingHorizontal: 3 }} />,
    text: activityInfo.place,
  },
  {
    icon: <InfoIcon style={{ marginBottom: 15 }} />,
    text: activityInfo.description,
  },
];
