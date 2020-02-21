package anups.utility.core.files.excel.test;

import anups.utility.core.files.excel.ExcelParser;

public class ExcelReader {

	private static final String FILENAME = System.getProperty("user.dir")+"\\src\\main\\resources\\test.csv";
	
	public void execute() {
		ExcelParser excelParser = new ExcelParser(FILENAME, ExcelColumnPojo.class);
	}
	
}
