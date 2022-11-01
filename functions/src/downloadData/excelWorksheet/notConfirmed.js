const dateFns = require("date-fns");

const { filterTimeEntries, sortArray } = require("./helpers/functions");
const { months } = require("./helpers/data");

exports.createWorksheet = (workbook, excelData) => {
  let { activities, timeEntries, users } = excelData;

  const worksheet = workbook.addWorksheet("Icke godkända");

  worksheet.columns = [
    { header: "Månad", key: "month", width: 10 },
    { header: "Admin", key: "admin", width: 20 },
    { header: "Användare", key: "user", width: 20 },
    { header: "Aktivitet", key: "activity", width: 20 },
    { header: "Stad", key: "city", width: 15 },
    { header: "Datum", key: "date", width: 15 },
    { header: "Tid (h)", key: "time", width: 10 },
  ];

  worksheet.getCell("A1").font = { bold: true };
  worksheet.getCell("B1").font = { bold: true };
  worksheet.getCell("C1").font = { bold: true };
  worksheet.getCell("D1").font = { bold: true };
  worksheet.getCell("E1").font = { bold: true };
  worksheet.getCell("F1").font = { bold: true };
  worksheet.getCell("G1").font = { bold: true };

  let unconfirmedTimeEntries = filterTimeEntries(timeEntries, false);

  let excelArray = [];

  users.map((user) => {
    unconfirmedTimeEntries.map((timeEntry) => {
      if (user.id === timeEntry.user_id) {
        let admin = users.find((admin) => {
          if (admin.id === timeEntry.admin_id) {
            return admin;
          }
        });

        let activity = activities.find((activity) => {
          if (activity.id === timeEntry.activity_id) {
            return activity;
          }
        });

        const date = timeEntry.date.toDate();

        excelArray.push({
          month: months[date.getMonth()],
          admin: `${admin.first_name} ${admin.last_name}`,
          user: `${user.first_name} ${user.last_name}`,
          activity: activity.activity_title,
          city: activity.activity_city,
          date: dateFns.format(date, "yyyy-MM-dd"),
          time: timeEntry.time,
        });
      }
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
};
