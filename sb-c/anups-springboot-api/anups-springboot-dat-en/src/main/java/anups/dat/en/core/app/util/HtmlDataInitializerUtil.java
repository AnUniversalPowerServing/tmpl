package anups.dat.en.core.app.util;

import java.util.Map.Entry;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import anups.dat.en.core.html.HtmlDataParser;
import anups.utility.core.files.FileManager;

public class HtmlDataInitializerUtil {
 
	public void packagesAndClassesBuilder(String folderPackage, String fromFolderPath, String toFolderPath, String[] ignoreFOF) {
	  System.out.println("packagesAndClassesBuilder: ");
	  System.out.println("fromFolderPath: "+fromFolderPath);
	  System.out.println("toFolderPath: "+toFolderPath);
	  HtmlDataInitializerUtil htmlDataInitializerUtil = new HtmlDataInitializerUtil();
	  FileManager fileManager = new FileManager();
	  JsonObject jsonObject = new Gson().fromJson(fileManager.getListOfFilesAndFolders(fromFolderPath, ignoreFOF), JsonObject.class);
	  System.out.println("jsonObject: "+jsonObject);
	  for(Entry<String, JsonElement> json : jsonObject.entrySet()) {
	    String fileName= json.getKey();
	    String fileType = json.getValue().getAsString();
	    if("DIRECTORY".equalsIgnoreCase(fileType)) {
	    	boolean isCreated = fileManager.createAFolder(toFolderPath, fileName);
	    	System.out.println(fileName+" is created: "+isCreated);
	    	System.out.println(fromFolderPath+" "+fileName);
	    	String fromSubFolderPath = fromFolderPath+"."+fileName;
	    	String toSubFolderPath = toFolderPath+"."+fileName;
	        htmlDataInitializerUtil.packagesAndClassesBuilder(folderPackage, fromSubFolderPath, toSubFolderPath, ignoreFOF);
		} else if("FILE".equalsIgnoreCase(fileType)) {
			/* Check FIle Extension Type */
			if(fileName.contains(".hdat")){
				System.out.println(fileName+" contains .hdat");
				String javaClassFile = fileName.replace(".hdat", ".java");
				boolean isCreated = fileManager.createAFile(toFolderPath, javaClassFile);
				// HtmlDataParser htmlDataParser = new HtmlDataParser("");
				// htmlDataParser.getListOfParams(params, html, index);
			}
			
		}
	  }
	}
	
	
}
