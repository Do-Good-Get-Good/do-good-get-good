const { filterTimeEntries } = require("./helpers/functions");
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

  if (userTimeEntries.length > 1) {
    userTimeEntries.sort((a, b) => {
      a.year !== b.year
        ? a.year - b.year
        : months.indexOf(a.month) - months.indexOf(b.month);
    });
  }

  const columns = [];

  columns.push({
    header: "Datum",
    key: "date",
    width: 13,
    style: {
      font: {
        bold: true,
      },
    },
  });

  const prevCities = [];
  userTimeEntries.map((entry) => {
    if (prevCities.includes(entry.city)) return;

    prevCities.push(entry.city);
    columns.push({
      header: `${entry.city} tid(h)`,
      key: `${entry.city}`,
      width: 15,
      style: {
        font: {
          bold: true,
        },
      },
    });
  });

  worksheet.columns = columns;

  const worksheetRows = [];
  userTimeEntries.map((entr) => {
    let month = shortenMonth(entr.month);
    let date = `${entr.year} - ${month}`;

    wsObj = {
      date: date,
      [`${entr.city}`]: entr.time,
    };
    worksheetRows.push(wsObj);
  });

  let rowData = {};
  worksheetRows.forEach(
    (row) => (rowData[row.date] = { ...rowData[row.date], ...row })
  );
  rowData = Object.values(rowData);

  rowData.map((data) => {
    worksheet.addRow(data);
  });
}

function shortenMonth(month) {
  let shortMonth = "";
  if (month !== "September") shortMonth = month.substring(0, 3);
  else shortMonth = month.substring(0, 4);

  return shortMonth;
}

const autoWidth = (worksheet, minimalWidth = 10) => {
  worksheet.columns.forEach((column) => {
    let maxColumnLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      maxColumnLength = Math.max(
        maxColumnLength,
        minimalWidth,
        cell.value ? cell.value.toString().length : 0
      );
    });
    column.width = maxColumnLength + 1;
  });
};

exports.createWorksheet = (workbook, excelData) => {
  const worksheet = workbook.addWorksheet("Tid per region");
  populateExcelSheetWithRegionData(worksheet, excelData);
  autoWidth(worksheet);
};
