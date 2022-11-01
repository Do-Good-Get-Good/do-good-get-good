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

exports.filterTimeEntries = filterTimeEntries;
exports.sortArray = sortArray;
