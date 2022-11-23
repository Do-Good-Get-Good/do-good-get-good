const months = {
  long: [
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
  ],
  short: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Maj",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Okt",
    "Nov",
    "Dec",
  ],
};

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

function sortArrayByDate(arr, monthType) {
  arr.sort((a, b) => {
    a.year !== b.year
      ? a.year - b.year
      : months[monthType].indexOf(a.month) - months[monthType].indexOf(b.month);
  });
}

function sumTimeEntryTime(obj, key, item) {
  if (obj[key]) {
    obj[key].time += item.time;
  } else {
    obj[key] = { ...item };
  }
  return obj;
}

exports.months = months;
exports.filterTimeEntries = filterTimeEntries;
exports.sortArray = sortArray;
exports.sortArrayByDate = sortArrayByDate;
exports.sumTimeEntryTime = sumTimeEntryTime;
