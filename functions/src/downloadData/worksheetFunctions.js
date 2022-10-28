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

function sortArrayByYear(a, b) {
  if (a.year < b.year) {
    return -1;
  } else if (a.year == b.year) {
    return 0;
  } else {
    return 1;
  }
}

function filterTimeEntries(timeEntryArr, status) {
  return timeEntryArr.filter((entry) => {
    if (entry.status_confirmed === status) return entry;
  });
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

function populateExcelSheetWithYearData(excelData, worksheet) {
  let { activities, timeEntries, users } = excelData;

  let confirmedTimeEntries = filterTimeEntries(timeEntries, true);

  users.map((user) => {
    let entries = [];
    confirmedTimeEntries.map((timeEntry) => {
      if (user.id === timeEntry.user_id) {
        let activity = activities.find((activity) => {
          if (activity.id === timeEntry.activity_id) {
            return activity;
          }
        });

        const date = timeEntry.date.toDate();

        const entryData = {
          activityId: timeEntry.activity_id,
          year: `${date.getFullYear()}`,
          user: `${user.first_name} ${user.last_name}`,
          activity: activity.activity_title,
          city: activity.activity_city,
          time: timeEntry.time,
        };

        entries.push(entryData);
      }
    });

    let userTimeEntries = [];

    entries.map((data) => {
      if (userTimeEntries.length === 0) {
        userTimeEntries.push(data);
      } else {
        userTimeEntries.map((obj) => {
          if (obj.activityId !== data.activityId) userTimeEntries.push(data);
          else {
            obj.time += data.time;
          }
        });
      }
    });
    userTimeEntries.sort(sortArrayByYear);

    userTimeEntries.map((entry) => {
      let wsData = {
        year: entry.year,
        user: entry.user,
        activity: entry.activity,
        city: entry.city,
        time: entry.time,
      };
      worksheet.addRow(wsData);
    });
  });
}

function makeWorksheetHeaderBold(worksheet) {
  worksheet.getCell("A1").font = { bold: true };
  worksheet.getCell("B1").font = { bold: true };
  worksheet.getCell("C1").font = { bold: true };
  worksheet.getCell("D1").font = { bold: true };
  worksheet.getCell("E1").font = { bold: true };
}

exports.createConfirmedWorksheet = (workbook, excelData, yearOrMonth) => {
  const worksheet = workbook.addWorksheet("Godkända");

  if (yearOrMonth === "YEAR") {
    worksheet.columns = [
      { header: "År", key: "year", width: 10 },
      { header: "Användare", key: "user", width: 20 },
      { header: "Aktivitet", key: "activity", width: 20 },
      { header: "Stad", key: "city", width: 15 },
      { header: "Total tid (h)", key: "time", width: 12 },
    ];
    makeWorksheetHeaderBold(worksheet);
    populateExcelSheetWithYearData(excelData, worksheet);
  } else if (yearOrMonth === "MONTH") {
    worksheet.columns = [
      { header: "Månad", key: "month", width: 10 },
      { header: "Användare", key: "user", width: 20 },
      { header: "Aktivitet", key: "activity", width: 20 },
      { header: "Stad", key: "city", width: 15 },
      { header: "Total tid (h)", key: "time", width: 10 },
    ];
    makeWorksheetHeaderBold(worksheet);
    populateExcelSheetWithMonthData(excelData, worksheet);
  }
};
