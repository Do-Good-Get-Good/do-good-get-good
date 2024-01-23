// const admin = require("firebase-admin");
// const functions = require("firebase-functions");

// export const updateUserEmail = functions.https.onCall((request, response) => {
//   try {
//     // Extract user ID and new email from the request data
//     const { userId, newEmail } = request;

//     // Update the user's email
//     admin.auth().updateUser(userId, {
//       email: newEmail,
//     });

//     return { success: true, message: "User email updated successfully." };
//   } catch (error) {
//     console.error("Error updating user email:", error);
//     return { error: "Failed to update user email." };
//   }
// });
