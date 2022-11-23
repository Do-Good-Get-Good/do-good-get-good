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

const printNoDataFound = (msgString, worksheet) => {
  worksheet.columns = [
    {
      header: "Meddelande",
      key: "msg",
      width: 10,
      style: {
        font: {
          bold: true,
        },
      },
    },
  ];
  worksheet.addRow({
    msg: msgString,
  });
};

const makeRowTextBold = (worksheet, rowNumber) => {
  let columns = worksheet.columns;
  let row = worksheet.getRow(rowNumber);
  for (let i = 1; i <= columns.length; i++) {
    row.getCell(i).font = {
      bold: true,
    };
  }
};

exports.autoWidth = autoWidth;
exports.printNoDataFound = printNoDataFound;
exports.makeRowTextBold = makeRowTextBold;
