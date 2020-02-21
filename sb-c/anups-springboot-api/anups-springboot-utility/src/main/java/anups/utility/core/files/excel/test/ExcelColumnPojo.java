package anups.utility.core.files.excel.test;

import anups.utility.core.files.annotations.ExcelColumnMapper;

public class ExcelColumnPojo {
  @ExcelColumnMapper("column#1")
  private String column1;
  @ExcelColumnMapper("column#2")
  private String column2;
  @ExcelColumnMapper("column#3")
  private String column3;
  @ExcelColumnMapper("column#4")
  private String column4;
  @ExcelColumnMapper("column#5")
  private String column5;
}
