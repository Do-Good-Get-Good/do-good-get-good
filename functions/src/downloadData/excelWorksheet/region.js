const dateFns = require("date-fns");

const { filterTimeEntries, sortArray } = require("./helpers/functions");
const { months } = require("./helpers/data");

function populateExcelSheetWithRegionData(worksheet, excelData) {
  let { activities, timeEntries } = excelData;

  let confirmedTimeEntries = filterTimeEntries(timeEntries, true);

  let entries = [];
  confirmedTimeEntries.map((timeEntry) => {
    let activity = activities.find((activity) => {
      if (activity.id === timeEntry.activity_id) {
        return activity;
      }
    });

    const date = timeEntry.date.toDate();

    const entryData = {
      year: date.getFullYear(),
      month: months[date.getMonth()],
      city: activity.activity_city,
      time: timeEntry.time,
    };

    entries.push(entryData);
  });

  const arrayHashmap = entries.reduce((obj, item) => {
    const objName = `${item.city}${item.year}${item.month}`;

    if (obj[objName]) {
      obj[objName].time += item.time;
    } else {
      obj[objName] = { ...item };
    }

    return obj;
  }, {});

  const userTimeEntries = Object.values(arrayHashmap);

  userTimeEntries.sort((a, b) => {
    a.year !== b.year
      ? a.year - b.year
      : months.indexOf(a.month) - months.indexOf(b.month);
  });

  const columns = [];

  columns.push({ header: "Region", key: "region", width: 15 });

  userTimeEntries.map((entry, i) => {
    columns.push({
      header: `${entry.year} - ${entry.month} tid(h)`,
      key: `${entry.year}${entry.month}`,
      width: 15,
    });
  });

  worksheet.columns = columns;

  userTimeEntries.map((entry) => {
    let wsData = {
      region: entry.city,
      [`${entry.year}${entry.month}`]: entry.time,
    };
    worksheet.addRow(wsData);
  });
}

exports.createWorksheet = (workbook, excelData) => {
  const worksheet = workbook.addWorksheet("Tid per region");
  populateExcelSheetWithRegionData(worksheet, excelData);
};
