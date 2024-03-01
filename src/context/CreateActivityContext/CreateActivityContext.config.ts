import { Activity } from "../../utility/types";

export interface ICreateActivityContext {
  activeActivities: Activity[];
  setAllActiveActvivitiesFB: (value: Activity[]) => void;
  changedActivity: Activity;
  activityHasChanged: (value: boolean) => void;
  activityHasChangedID: (value: {
    activityInfo: Activity;
    statusActive: boolean;
  }) => void;
  updateGallery: boolean;
  setUpdateGallery: (value: boolean) => void;
  searchWordHasNoMatch: boolean;
  setSearchWordHasNoMatch: (value: boolean) => void;
  word: (value: string) => void;
  showSearchObject: Activity[];
}

export type DropdownAnswer = { title: string };
