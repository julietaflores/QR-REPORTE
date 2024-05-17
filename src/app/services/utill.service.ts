import { Injectable } from '@angular/core';
import * as XLSX from "xlsx";

const getFileName = (name: string) => {
  let timeSpan = new Date().toISOString();
  let sheetName = name || "ExportResult";
  let fileName = `${sheetName}-${timeSpan}`;
  return {
    sheetName,
    fileName
  };
};


export class UtillService {

  //  exportTableToExcel(tableId: string, name: string) {
  //   let { sheetName, fileName } = getFileName(name);
  //   let targetTableElm = document.getElementById(tableId);

  //   let wb = XLSX.utils.table_to_book(targetTableElm,<XLSX.Table2SheetOpts>{
  //     sheet: sheetName
  //   });

  //   XLSX.writeFile(wb, `${fileName}.xlsx`);

  // }
 
  exportAsExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }


}
