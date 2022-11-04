function filterTimeEntries(timeEntryArr, status) {
  return timeEntryArr.filter((entry) => {
    if (entry.status_confirmed === status) return entry;
  });
}

function sortArray(a, b) {
  if (a < b) {
    return -1;
  } else if (a == b) {
    return 0;
  } else {
    return 1;
  }
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

exports.filterTimeEntries = filterTimeEntries;
exports.sortArray = sortArray;
exports.autoWidth = autoWidth;
