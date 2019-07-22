package anups.dat.en.core.html.util;

import java.util.ArrayList;


public class HtmlDataParserUtil {
	
	private static ArrayList<String> params;
    private static int index;
    
    public static ArrayList<String> getListOfParamsBtwnPattern(String html, String startPattern, String endPattern) { 
    	params = new ArrayList<String>();
        index = 0;	
        return patternParamFinder(html, startPattern, endPattern);
    }
    
	public static ArrayList<String> patternParamFinder(String html, String startPattern, String endPattern) { 
		// startPattern = ${ , endPattern = }
		int startIndex = html.indexOf(startPattern,index);
		if(startIndex!=-1) {
			index = html.indexOf(endPattern, startIndex);
		  String subString = html.substring(startIndex, index).replace(startPattern, "");
		  params.add(subString);
	      HtmlDataParserUtil.patternParamFinder(html, startPattern, endPattern); 
		}
	  return params;
	}

}
