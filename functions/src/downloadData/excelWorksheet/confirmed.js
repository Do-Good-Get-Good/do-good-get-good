const {
  autoWidth,
  printNoDataFound,
  makeRowTextBold,
} = require("./utilities/worksheetUtilities");
const {
  months,
  filterTimeEntries,
  sumTimeEntryTime,
  sortArrayByDate,
} = require("./utilities/dataUtilities");

function populateExcelSheetWithData(
  type,
  excelData,
  worksheet,
  confirmedTimeEntries
) {
  let { activities, users } = excelData;

  let entries = [];
  confirmedTimeEntries.forEach((timeEntry) => {
    let user = users.find((user) => user.id === timeEntry.user_id);

    let activity = activities.find(
      (activity) => activity.id === timeEntry.activity_id
    );

    const date = timeEntry.date.toDate();

    const entryData = {
      activityId: timeEntry?.activity_id ?? "",
      year: date.getFullYear() ?? "",
      month: months.short[date.getMonth()] ?? "",
      user: user ? `${user.first_name} ${user.last_name}` : "",
      activity: activity?.activity_title ?? timeEntry.activity_title ?? "",
      city: activity?.activity_city ?? "",
      time: timeEntry?.time ?? "",
    };

    entries.push(entryData);
  });

  const timeEntrySum = entries.reduce((obj, item) => {
    let key = `${item.user}${item.activityId}${item.year}`;
    if (type === "MONTH") key = `${key}${item.month}`;

    return sumTimeEntryTime(obj, key, item);
  }, {});

  const userTimeEntries = Object.values(timeEntrySum);

  sortArrayByDate(userTimeEntries, "short");

  userTimeEntries.forEach((entry) => {
    let wsData = {
      date: type === "YEAR" ? entry.year : `${entry.year} - ${entry.month}`,
      user: entry.user,
      activity: entry.activity,
      city: entry.city,
      time: entry.time,
    };
    worksheet.addRow(wsData);
  });
}

function createNewHeader(worksheet) {
  const rowCount = worksheet.rowCount;

  const cell1 = worksheet.getCell(`A${rowCount + 2}`);
  const cell2 = worksheet.getCell(`B${rowCount + 2}`);
  const cell3 = worksheet.getCell(`C${rowCount + 2}`);
  const cell4 = worksheet.getCell(`D${rowCount + 2}`);
  const cell5 = worksheet.getCell(`E${rowCount + 2}`);
  const cellArr = [cell1, cell2, cell3, cell4, cell5];

  cellArr.forEach((cell, index) => {
    if (index === 0) cell.value = "Månad";
    else cell.value = worksheet.columns[index].header;
    cell.font = { bold: true };
  });
}

exports.createWorksheet = (workbook, excelData) => {
  const worksheet = workbook.addWorksheet("Godkända");

  const { timeEntries } = excelData;
  let confirmedTimeEntries = filterTimeEntries(timeEntries, true);

  if (confirmedTimeEntries.length === 0) {
    printNoDataFound(
      "Finns inga godkända tidregistreringar för det valda tidsspannet!",
      worksheet
    );
  } else {
    worksheet.columns = [
      { header: "År", key: "date", width: 16 },
      { header: "Användare", key: "user", width: 20 },
      { header: "Aktivitet", key: "activity", width: 20 },
      { header: "Stad", key: "city", width: 15 },
      { header: "Total tid (h)", key: "time", width: 12 },
    ];

    makeRowTextBold(worksheet, 1);
    populateExcelSheetWithData(
      "YEAR",
      excelData,
      worksheet,
      confirmedTimeEntries
    );

    createNewHeader(worksheet);
    populateExcelSheetWithData(
      "MONTH",
      excelData,
      worksheet,
      confirmedTimeEntries
    );
  }
  autoWidth(worksheet);
};
