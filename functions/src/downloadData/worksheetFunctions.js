const notConfirmed = require("./excelWorksheet/notConfirmed.js");
const confirmed = require("./excelWorksheet/confirmed");

exports.createNotConfirmedWorksheet = (workbook, excelData) => {
  notConfirmed.createWorksheet(workbook, excelData);
};

exports.createConfirmedWorksheet = (workbook, excelData) => {
  confirmed.createWorksheet(workbook, excelData);
};
