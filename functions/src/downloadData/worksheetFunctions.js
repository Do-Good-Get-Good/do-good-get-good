const dateFns = require("date-fns");

const months = [
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

function sortArray(a, b) {
  if (a < b) {
    return -1;
  } else if (a == b) {
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

function populateExcelSheetWithYearData(excelData, worksheet) {
  let { activities, timeEntries, users } = excelData;

  let confirmedTimeEntries = filterTimeEntries(timeEntries, true);

  let entries = [];
  confirmedTimeEntries.map((timeEntry) => {
    users.map((user) => {
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
  });
  const arrayHashmap = entries.reduce((obj, item) => {
    const objName = `${item.user}${item.activityId}${item.year}`;

    if (obj[objName]) {
      obj[objName].time += item.time;
    } else {
      obj[objName] = { ...item };
    }

    return obj;
  }, {});

  const userTimeEntries = Object.values(arrayHashmap);

  // Sort array by year
  userTimeEntries.sort((a, b) => sortArray(a.year, b.year));

  userTimeEntries.map((entry) => {
    let wsData = {
      date: entry.year,
      user: entry.user,
      activity: entry.activity,
      city: entry.city,
      time: entry.time,
    };
    worksheet.addRow(wsData);
  });
}

function makeWorksheetHeaderBold(worksheet) {
  worksheet.getCell("A1").font = { bold: true };
  worksheet.getCell("B1").font = { bold: true };
  worksheet.getCell("C1").font = { bold: true };
  worksheet.getCell("D1").font = { bold: true };
  worksheet.getCell("E1").font = { bold: true };
}

function populateExcelSheetWithMonthData(excelData, worksheet) {
  let { activities, timeEntries, users } = excelData;

  let confirmedTimeEntries = filterTimeEntries(timeEntries, true);

  let entries = [];
  confirmedTimeEntries.map((timeEntry) => {
    users.map((user) => {
      if (user.id === timeEntry.user_id) {
        let activity = activities.find((activity) => {
          if (activity.id === timeEntry.activity_id) {
            return activity;
          }
        });

        const date = timeEntry.date.toDate();

        const entryData = {
          activityId: timeEntry.activity_id,
          year: date.getFullYear(),
          month: months[date.getMonth()],
          user: `${user.first_name} ${user.last_name}`,
          activity: activity.activity_title,
          city: activity.activity_city,
          time: timeEntry.time,
        };

        entries.push(entryData);
      }
    });
  });

  const arrayHashmap = entries.reduce((obj, item) => {
    const objName = `${item.activityId}${item.month}`;

    if (obj[objName]) {
      obj[objName].time += item.time;
    } else {
      obj[objName] = { ...item };
    }

    return obj;
  }, {});

  const userTimeEntries = Object.values(arrayHashmap);

  // Sort array by month
  userTimeEntries.sort((a, b) => {
    a.year !== b.year
      ? a.year - b.year
      : months.indexOf(a.month) - months.indexOf(b.month);
  });

  userTimeEntries.map((entry) => {
    let wsData = {
      date: `${entry.year} - ${entry.month}`,
      user: entry.user,
      activity: entry.activity,
      city: entry.city,
      time: entry.time,
    };
    worksheet.addRow(wsData);
  });
}

exports.createConfirmedWorksheet = (workbook, excelData) => {
  const worksheet = workbook.addWorksheet("Godkända");

  worksheet.columns = [
    { header: "År", key: "date", width: 16 },
    { header: "Användare", key: "user", width: 20 },
    { header: "Aktivitet", key: "activity", width: 20 },
    { header: "Stad", key: "city", width: 15 },
    { header: "Total tid (h)", key: "time", width: 12 },
  ];

  makeWorksheetHeaderBold(worksheet);
  populateExcelSheetWithYearData(excelData, worksheet);

  for (let i = 0; i < 2; i++) {
    worksheet.addRow();
  }

  const rowCount = worksheet.rowCount;

  const cell1 = worksheet.getCell(`A${rowCount + 2}`);
  const cell2 = worksheet.getCell(`B${rowCount + 2}`);
  const cell3 = worksheet.getCell(`C${rowCount + 2}`);
  const cell4 = worksheet.getCell(`D${rowCount + 2}`);
  const cell5 = worksheet.getCell(`E${rowCount + 2}`);
  const cellArr = [cell1, cell2, cell3, cell4, cell5];

  cellArr.map((cell, index) => {
    if (index === 0) cell.value = "Månad";
    else cell.value = worksheet.columns[index].header;
    cell.font = { bold: true };
  });

  populateExcelSheetWithMonthData(excelData, worksheet);
};
