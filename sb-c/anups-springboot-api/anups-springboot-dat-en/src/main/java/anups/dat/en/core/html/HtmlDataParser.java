package anups.dat.en.core.html;

import java.util.ArrayList;

import anups.dat.en.core.html.util.HtmlDataParserUtil;
import anups.utility.core.files.FileManager;

public class HtmlDataParser {
	
	private static String moduleDat;
	
	public HtmlDataParser(String fileName) {
	  FileManager fileManager = new FileManager();
	  moduleDat = fileManager.readAFile(fileName);
	}

	public ArrayList<String> getHtmlAttributesList() {
	  return HtmlDataParserUtil.getListOfParamsBtwnPattern(moduleDat, "[", "]"); 
	}
	
	public ArrayList<String> getHtmlAttributeParamsList(String key) {
	  int startIndex = moduleDat.indexOf("["+key+"]");
	  int endIndex = moduleDat.indexOf(';', startIndex);
      String subString = moduleDat.substring(startIndex, endIndex);
	  String html = subString.split("=>")[1];
	  return HtmlDataParserUtil.getListOfParamsBtwnPattern(html, "${", "}"); 
	}
	
	public String getHTMLAttributeContent(String key) {
	  int startIndex = moduleDat.indexOf("["+key+"]");
	  int endIndex = moduleDat.indexOf(';', startIndex);
	  String subString = moduleDat.substring(startIndex, endIndex);
	  return subString.split("=>")[1];
	}

 public static void main(String args[]) {
   String fileName = "E:\\workspace-sts\\aaf\\aaf-springboot-builder\\src\\main\\resources\\static\\dat\\htm\\TestModule.hdat";
   HtmlDataParser fileRead = new HtmlDataParser(fileName);
   System.out.println("List Of Attributes in a File: "+fileRead.getHtmlAttributesList());
   System.out.println("List Of Attribute Params in a File: "+fileRead.getHtmlAttributeParamsList("Qwert"));
   System.out.println("List Of Attribute Params in a File: "+fileRead.getHtmlAttributeParamsList("abcd"));
 } 
 
}
