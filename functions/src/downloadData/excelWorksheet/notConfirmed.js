const dateFns = require("date-fns");

const {
  autoWidth,
  printNoDataFound,
  makeRowTextBold,
} = require("./utilities/worksheetUtilities");
const {
  months,
  filterTimeEntries,
  sortArray,
} = require("./utilities/dataUtilities");

exports.createWorksheet = (workbook, excelData) => {
  let { activities, timeEntries, users } = excelData;

  const worksheet = workbook.addWorksheet("Icke godkända");

  let unconfirmedTimeEntries = filterTimeEntries(timeEntries, false);

  if (unconfirmedTimeEntries.length === 0) {
    printNoDataFound(
      "Finns inga icke godkända tidregistreringar för det valda tidsspannet!",
      worksheet
    );
  } else {
    worksheet.columns = [
      { header: "Månad", key: "month", width: 10 },
      { header: "Admin", key: "admin", width: 20 },
      { header: "Användare", key: "user", width: 20 },
      { header: "Aktivitet", key: "activity", width: 20 },
      { header: "Stad", key: "city", width: 15 },
      { header: "Datum", key: "date", width: 15 },
      { header: "Tid (h)", key: "time", width: 10 },
    ];

    makeRowTextBold(worksheet, 1);

    let excelArray = [];
    unconfirmedTimeEntries.forEach((timeEntry) => {
      let user = users.find((user) => user.id === timeEntry.user_id);
      let admin = users.find((admin) => admin.id === timeEntry.admin_id);
      let activity = activities.find(
        (activity) => activity.id === timeEntry.activity_id
      );

      const date = timeEntry.date.toDate();

      excelArray.push({
        month: months.long[date.getMonth()],
        admin: admin ? `${admin.first_name} ${admin.last_name}` : "",
        user: user ? `${user.first_name} ${user.last_name}` : "",
        activity: activity?.activity_title ?? timeEntry.activity_title ?? "",
        city: activity?.activity_city ?? "",
        date: dateFns.format(date, "yyyy-MM-dd"),
        time: timeEntry.time,
      });
    });

    // Sort array by date
    excelArray.sort((a, b) => sortArray(new Date(a.date), new Date(b.date)));

    let oldMonth = excelArray[0].month;

    for (let i = 0; i < excelArray.length; i++) {
      if (oldMonth != excelArray[i].month) {
        oldMonth = excelArray[i].month;
        worksheet.addRow();
      }
      worksheet.addRow(excelArray[i]);
    }
  }
  autoWidth(worksheet);
};
