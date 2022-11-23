const {
  autoWidth,
  makeRowTextBold,
  printNoDataFound,
} = require("./utilities/worksheetUtilities");
const { months, filterTimeEntries } = require("./utilities/dataUtilities");

function populateExcelSheetWithRegionData(worksheet, excelData) {
  let { activities, timeEntries } = excelData;

  let confirmedTimeEntries = filterTimeEntries(timeEntries, true);

  if (confirmedTimeEntries.length === 0) {
    printNoDataFound(
      "Finns inga godkända tidregistreringar för det valda tidsspannet!",
      worksheet
    );
  } else {
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
        month: months.short[date.getMonth()],
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
          : months.short.indexOf(a.month) - months.short.indexOf(b.month);
      });
    }

    const columns = [];

    columns.push({
      header: "Datum",
      key: "date",
      width: 13,
    });

    const prevCities = [];
    userTimeEntries.map((entry) => {
      if (prevCities.includes(entry.city)) return;

      prevCities.push(entry.city);
      columns.push({
        header: `${entry.city} tid(h)`,
        key: `${entry.city}`,
        width: 15,
      });
    });

    worksheet.columns = columns;

    makeRowTextBold(worksheet, 1);

    const worksheetRows = [];
    userTimeEntries.map((entr) => {
      let date = `${entr.year} - ${entr.month}`;

      let wsObj = {
        date: date,
      };

      prevCities.map((city) => {
        if (city === entr.city) wsObj[city] = entr.time;
        else wsObj[city] = 0;
      });
      worksheetRows.push(wsObj);
    });

    worksheetRows.map((data) => {
      worksheet.addRow(data);
    });
  }
}

exports.createWorksheet = (workbook, excelData) => {
  const worksheet = workbook.addWorksheet("Tid per region");
  populateExcelSheetWithRegionData(worksheet, excelData);
  autoWidth(worksheet);
};
