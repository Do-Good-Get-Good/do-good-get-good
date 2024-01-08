import React, {
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import { getAllActivitiesWithStatus } from "../../firebase-functions/get";
import { Activity } from "../../utilily/types";
import { ICreateActivityContext } from "./CreateActivityContext.config";

const CreateActivityContext = React.createContext<
  ICreateActivityContext | undefined
>(undefined);

export const useCreateActivityFunction = () => {
  return useContext(CreateActivityContext);
};

export const CreateActivityProvider = ({ children }: PropsWithChildren) => {
  const [allActiveActvivitiesFB, setAllActiveActvivitiesFB] = useState<
    Activity[]
  >([]);
  const [updateActivityGallery, setUpdateActivityGallery] = useState(false);
  const [searchWordHasNoMatch, setSearchWordHasNoMatch] = useState(false);
  const [searchArray, setSearchArray] = useState<Activity[]>([]);
  const [searchingWord, setSearchingWord] = useState("");
  const [newChangeActivity, setNewChangeActivity] = useState<Activity>({
    id: "",
    title: "",
    city: "",
    photo: "",
    description: "",
    popular: "",
    imageUrl: "",
  });
  const [changedOneActivity, setChangedOneActivity] = useState(false);
  const [activityID, setActivityID] = useState<{
    activityInfo: Activity;
    statusActive: boolean;
  }>({
    activityInfo: {
      id: "",
      active: false,
      city: "",
      description: "",
      place: "",
      photo: "",
      title: "",
      popular: "",
      imageUrl: "",
    },
    statusActive: false,
  });

  useEffect(() => {
    const getActiveActivities = async () => {
      try {
        let activities: Activity[] = await getAllActivitiesWithStatus(true);
        setAllActiveActvivitiesFB(activities);
      } catch (error) {
        console.log("CreateActivityContext errorMessage ", error);
      }
    };
    getActiveActivities();
  }, []);

  useEffect(() => {
    if (changedOneActivity === true) {
      const dataInfo: Activity = {
        id: activityID?.activityInfo.id ?? "",
        active: activityID?.statusActive,
        city: activityID?.activityInfo.city,
        description: activityID?.activityInfo.description,
        place: activityID?.activityInfo.place,
        photo: activityID?.activityInfo.photo,
        title: activityID?.activityInfo.title,
        popular: activityID?.activityInfo.popular,
        imageUrl: activityID?.activityInfo.imageUrl,
      };
      setNewChangeActivity(dataInfo);
      setChangedOneActivity(false);
      setUpdateActivityGallery(true);
    }
  }, [changedOneActivity]);

  useEffect(() => {
    let newArray = allActiveActvivitiesFB;
    let arrayWithFoundObjects: Activity[] = [];

    if (searchingWord !== "") {
      newArray.forEach((item) => {
        const { title, city, id } = item;
        const searchAtTitle = title
          .toLowerCase()
          .includes(searchingWord.toLowerCase());
        const searchAtCity = city
          .toLowerCase()
          .includes(searchingWord.toLowerCase());

        if (searchAtTitle || searchAtCity) {
          const isObjectAlreadyExist = arrayWithFoundObjects.some(
            (x) => x.id === id,
          );

          if (!isObjectAlreadyExist) {
            arrayWithFoundObjects.push(item);
          }
        }
      });

      setSearchArray(arrayWithFoundObjects);

      if (arrayWithFoundObjects.length === 0) {
        setSearchWordHasNoMatch(true);
      }
    } else {
      setSearchArray([]);
    }
  }, [searchingWord]);

  return (
    <CreateActivityContext.Provider
      value={{
        activeActivities: allActiveActvivitiesFB,
        setAllActiveActvivitiesFB: setAllActiveActvivitiesFB,

        changedActivity: newChangeActivity,
        activityHasChanged: setChangedOneActivity,

        activityHasChangedID: setActivityID,
        updateGallery: updateActivityGallery,
        setUpdateGallery: setUpdateActivityGallery,

        searchWordHasNoMatch: searchWordHasNoMatch,
        setSearchWordHasNoMatch: setSearchWordHasNoMatch,
        word: setSearchingWord,
        showSearchObject: searchArray,
      }}
    >
      {children}
    </CreateActivityContext.Provider>
  );
};
