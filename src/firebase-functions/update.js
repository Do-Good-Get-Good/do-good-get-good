import firestore from "@react-native-firebase/firestore";

export const updateTimeEntry = async (timeEntryID, date, hours) => {
  try {
    let response = await firestore()
      .collection("timeentries")
      .doc(timeEntryID)
      .update({
        date: date,
        time: hours,
      });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const confirmTimeEntry = async (timeEntryID) => {
  try {
    let response = await firestore()
      .collection("timeentries")
      .doc(timeEntryID)
      .update({
        status_confirmed: true,
      });
    return Promise.resolve(response);
  } catch (error) {
    console.log("There was an error confirming the timeentry");
    return Promise.reject(error);
  }
};

export const updateTotalHoursMonthForUser = (uid, updateValue) => {
  try {
    firestore().collection("Users").doc(uid).update({
      total_hours_month: updateValue,
    });
  } catch (error) {
    throw new Error(
      `There was an error updating 'total_hours_month' for user '${uid}' in Firebase`
    );
  }
};

export const incrementTotalConfirmedHoursForUser = (userId, time) => {
  try {
    firestore()
      .collection("Users")
      .doc(userId)
      .update({
        total_confirmed_hours: firestore.FieldValue.increment(time),
      });
  } catch (error) {
    console.log(
      "There was an error incrementing 'total_confirmed_hours'",
      error
    );
  }
};

export const incrementYearlyTotalHoursForUser = (userId, time) => {
  try {
    firestore()
      .collection("Users")
      .doc(userId)
      .update({
        total_hours_year: firestore.FieldValue.increment(time),
      });
  } catch (error) {
    console.log("There was an error incrementing 'total_hours_year'", error);
  }
};

export const updateUsersActivitiesAndAccumulatedTime = (
  userId,
  activitiesAndTime
) => {
  try {
    firestore().collection("Users").doc(userId).update({
      activities_and_accumulated_time: activitiesAndTime,
    });
  } catch (error) {
    console.log(
      "There was an error updating 'activities_and_accumulated_time'",
      error
    );
  }
};

export const updateUserInfoFromAdminScreen = (data) => {
  try {
    firestore().collection("Users").doc(data.userID).update({
      first_name: data.userFirstName,
      last_name: data.userLastName,
      status_active: data.statusActive,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateActivityFavoriteStatus = (activityId, status) => {
  try {
    firestore().collection("Activities").doc(activityId).update({
      tg_favorite: status,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateActivityActiveStatus = (activityId, status) => {
  try {
    firestore().collection("Activities").doc(activityId).update({
      active_status: status,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateActivityInfo = (newData) => {
  try {
    firestore().collection("Activities").doc(newData.id).update({
      active_status: newData.active,
      activity_city: newData.city,
      activity_description: newData.description,
      activity_place: newData.place,
      activity_title: newData.title,
      tg_favorite: newData.popular,
      imageUrl: newData.imageUrl,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateConnectedUsersOnActivity = (activityId, connectedUsers) => {
  try {
    firestore().collection("Activities").doc(activityId).update({
      connected_users: connectedUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

export const connectNewActivityToUser = async (user, activityId) => {
  try {
    let userToUpdate = firestore().collection("Users").doc(user.userID);
    let userActivitiesAndAccumulatedTime = (await userToUpdate.get()).data()
      .activities_and_accumulated_time;

    let activityAlreadyExist = false;

    userActivitiesAndAccumulatedTime.map((activity) => {
      if (activity.activity_id === activityId) activityAlreadyExist = true;
    });

    if (activityAlreadyExist) {
      await userToUpdate.update({
        connected_activities: firestore.FieldValue.arrayUnion(activityId),
      });
    } else {
      let newActivity = {
        accumulated_time: 0,
        activity_id: activityId,
      };

      await userToUpdate.update({
        activities_and_accumulated_time:
          firestore.FieldValue.arrayUnion(newActivity),
        connected_activities: firestore.FieldValue.arrayUnion(activityId),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeActivityFromUser = async (userId, activityId) => {
  try {
    let userToUpdate = firestore().collection("Users").doc(userId);

    await userToUpdate.update({
      connected_activities: firestore.FieldValue.arrayRemove(activityId),
    });
  } catch (error) {
    console.log(error);
  }
};
