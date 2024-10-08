import auth from "@react-native-firebase/auth";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { connectTestActivityIfUserHasNoActivity } from "../../firebase-functions/addTS/add";
import {
  deleteActivityConnectionFromUser,
  disconnectTestActivityIfUserHasRealActivity,
} from "../../firebase-functions/deleteTS/delete";
import { getActivityInformation } from "../../firebase-functions/getTS/get";
import { ActivityInfo, TimeObject } from "../../screens/HomePage/type";
import {
  FirebaseActivitiesAndAccumulatedTime,
  FirebaseUserType,
} from "../../utility/firebaseTypes";
import { temporaryActivityID } from "../../utility/utils";
const userID = auth()?.currentUser?.uid;

export const checkConnectedActivitiesAndPrepareAccumTimeArr = async (
  snapshotData: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  setActivityIdAndAccumTime: (ActivityIdAndAccumTime: TimeObject[]) => void
) => {
  let tempArr: TimeObject[] = [];
  const activityIdAndTime: FirebaseUserType["activities_and_accumulated_time"] =
    snapshotData?.data()?.activities_and_accumulated_time;
  const userConnectedActivities: FirebaseUserType["connected_activities"] =
    snapshotData?.data()?.connected_activities;

  await connectTestActivityIfActivityConnectedArrIsEmpty(
    userConnectedActivities
  );

  if (activityIdAndTime) {
    activityIdAndTime.map(async (data) => {
      let idAndTime = await makeTimeObject(
        snapshotData,
        data,
        userConnectedActivities
      );
      idAndTime && tempArr.push(idAndTime);
    });
  }
  setActivityIdAndAccumTime(tempArr);
};

const makeTimeObject = async (
  snapshotData: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  data: FirebaseActivitiesAndAccumulatedTime,
  userConnectedActivities: FirebaseUserType["connected_activities"]
) => {
  const isActivityConnected = userConnectedActivities.findIndex(
    (x) => x === data.activity_id
  );

  if (isActivityConnected !== -1) {
    let idAndTime = {
      accumulatedTime: data.accumulated_time,
      activityID: data.activity_id,
      adminID: snapshotData?.data()?.admin_id,
      connectedActivities: snapshotData?.data()?.connected_activities,
      paidTime: snapshotData?.data()?.total_confirmed_hours,
      timeForYear: snapshotData?.data()?.total_hours_year,
      currentForMonth: snapshotData?.data()?.total_hours_month,
    };
    return idAndTime;
  } else {
    userConnectedActivities.map(async (activityID) => {
      await getActivityInfoOrDeleteConnection(activityID);
    });
  }
};

const connectTestActivityIfActivityConnectedArrIsEmpty = async (
  userConnectedActivities: FirebaseUserType["connected_activities"]
) => {
  const hasTestActivity = userConnectedActivities.includes(temporaryActivityID);

  if (userConnectedActivities.length < 1 && userID) {
    await connectTestActivityIfUserHasNoActivity(userID);
  } else if (userConnectedActivities.length > 1 && userID && hasTestActivity)
    disconnectTestActivityIfUserHasRealActivity(userID);
};

export const makeActivityInfoObjectArr = async (
  activityIdAndAccumTime: TimeObject[],
  setActivityInfo: (info: ActivityInfo[]) => void,
  setLoading: (l: boolean) => void
) => {
  let activityArr: ActivityInfo[] = [];

  for (let i = 0; i < activityIdAndAccumTime.length; i++) {
    let data = await getActivitiesInfo(activityIdAndAccumTime[i]);
    data && activityArr.push(data);
  }
  setActivityInfo(activityArr);
  setLoading(false);
};

const getActivitiesInfo = async (activityIdAndAccumTime: TimeObject) => {
  const activityId = activityIdAndAccumTime.activityID;
  try {
    let activity = await getActivityInfoOrDeleteConnection(activityId);

    if (activity) {
      return {
        ...activity,
        time: activityIdAndAccumTime.accumulatedTime,
        adminId: activityIdAndAccumTime.adminID,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const getActivityInfoOrDeleteConnection = async (activityId: string) => {
  let activity = await getActivityInformation(activityId);
  if (activity) {
    return activity;
  } else {
    userID && (await deleteActivityConnectionFromUser(activityId, userID));
  }
};
