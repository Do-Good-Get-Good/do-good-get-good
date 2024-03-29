const notConfirmed = require("./excelWorksheet/notConfirmed");
const confirmed = require("./excelWorksheet/confirmed");
const region = require("./excelWorksheet/region");
const activity = require("./excelWorksheet/activity");

exports.createNotConfirmedWorksheet = (workbook, excelData) => {
  notConfirmed.createWorksheet(workbook, excelData);
};

exports.createConfirmedWorksheet = (workbook, excelData) => {
  confirmed.createWorksheet(workbook, excelData);
};

exports.createRegionWorksheet = (workbook, excelData) => {
  region.createWorksheet(workbook, excelData);
};

exports.createActivityWorksheet = (workbook, excelData) => {
  activity.createWorksheet(workbook, excelData);
};
