const dateFns = require("date-fns");

function getMonthNames() {
  return [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
  ];
}

function sortArrayByDate(a, b) {
  var date1 = new Date(a.date);
  var date2 = new Date(b.date);

  if (date1 < date2) {
    return -1;
  } else if (date1 == date2) {
    return 0;
  } else {
    return 1;
  }
}

exports.createNotConfirmedWorksheet = (workbook, excelData) => {
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

  let unconfirmedTimeEntries = timeEntries.filter((timeEntry) => {
    if (!timeEntry.status_confirmed) return timeEntry;
  });

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

        const months = getMonthNames();

        excelArray.push({
          month: months[dateFns.getMonth(timeEntry.date.toDate())],
          admin: `${admin.first_name} ${admin.last_name}`,
          user: `${user.first_name} ${user.last_name}`,
          activity: activity.activity_title,
          city: activity.activity_city,
          date: dateFns.format(timeEntry.date.toDate(), "yyyy-MM-dd"),
          time: timeEntry.time,
        });
      }
    });
  });

  excelArray.sort(sortArrayByDate);

  let oldMonth = excelArray[0].month;

  for (let i = 0; i < excelArray.length; i++) {
    if (oldMonth != excelArray[i].month) {
      oldMonth = excelArray[i].month;
      worksheet.addRow();
    }
    worksheet.addRow(excelArray[i]);
  }
};
