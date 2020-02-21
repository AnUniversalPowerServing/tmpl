package anups.utility.core.files;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class FileManager {

  public String getFileExtension(String fileName) {
	StringBuilder sb = new StringBuilder();
	for(int index=fileName.length()-1;index>0;index--) {
	  if(fileName.charAt(index)=='.') { break; }
	  else { sb.append(fileName.charAt(index)); }
	}
	return sb.toString();
  }
  
  public boolean createAFile(String mainDir, String fileName) {
	boolean isCreated = false;
	mainDir = mainDir.replace(".", "\\").replace("/", "\\");
    String fileWithDir = mainDir +"\\"+ fileName;
    File mainFile = new File(mainDir);	 
    if(!mainFile.exists()) { mainFile.mkdir(); }
    File file = new File(fileWithDir);
    if(!file.exists()) { 
	  try { isCreated = file.createNewFile(); } 
	  catch (IOException e) { e.printStackTrace(); } 
	}  
    return isCreated;
  }
  
  public String readAFile(String fileName) {
	StringBuilder sb = new StringBuilder();
    FileReader fr;
	try {
		fr = new FileReader(fileName);
		for(int i=0;(i=fr.read())!=-1;)    
			sb.append((char)i);  
		fr.close();
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} 
	return sb.toString();      
  }
  
  public boolean createAFolder(String mainDir, String folderPath) {
  /* folderPath can be in com.package.something (or) com\\pacakage\\something (or) com/package/something 
   * It will convert into com\\package\\something format
   */
	boolean isCreated = false;
	folderPath = folderPath.replace(".", "\\").replace("/", "\\");
	mainDir = mainDir.replace(".", "\\").replace("/", "\\");
	File mainFile = new File(mainDir);	 
    if(!mainFile.exists()) { mainFile.mkdir(); }
	StringBuilder sb = new StringBuilder(mainDir);
	for(String folder: folderPath.split("\\\\")) {
	  sb.append("\\").append(folder);
	  File file = new File(sb.toString());
	  if(!file.exists()) { file.mkdir();isCreated=true; }
	}
	return isCreated;	
  }

  public boolean deleteAFolder(String mainDir, String folderPath, boolean deleteEmptyFolder) {
  // deleteEmptyFolder = true  // Deletes Folder only If Folder is Empty
  // deleteEmptyFolder = false // Deletes Folder even iF fILES Exists
	boolean isDeleted = false;  
	mainDir = mainDir.replace(".", "\\").replace("/", "\\");
	folderPath = folderPath.replace(".", "\\").replace("/", "\\");
	FileManager fileManager = new FileManager();
	File file = new File(mainDir+"\\"+folderPath);
	
	boolean deleteCond = (file.exists() && file.list().length==0); // deleteEmptyFolder = true
	if(!deleteEmptyFolder) { deleteCond = file.exists(); } // deleteEmptyFolder = false
	if(deleteCond) { 
	  File[] children = file.listFiles();
	  for (int i = 0; i < children.length; i++) {
        if(children[i].isDirectory()) {
		  String folderName =children[i].getName();
		  String nextRoot = mainDir+"\\"+folderPath;
		  fileManager.deleteAFolder(nextRoot, folderName, deleteEmptyFolder);
	    } 
	   isDeleted = children[i].delete();
	  }
	  if(children.length==0) {  file.delete(); }
	}
	return isDeleted;
  }
  
  public String getListOfFilesAndFolders(String folderPath, String[] ignoreFOF) {
	  folderPath = folderPath.replace(".", "\\").replace("/", "\\");
	  Gson gson = new GsonBuilder().setPrettyPrinting().create();
	  File folder = new File(folderPath);
	  File[] listOfFiles = folder.listFiles();
	  HashMap<String,String> data = new HashMap<String,String>();
	  for (int i = 0; i < listOfFiles.length; i++) {
		String fileName = listOfFiles[i].getName();
		String type = "UNKNOWN";
	    if(listOfFiles[i].isFile()) { type = "FILE";  } 
	    else if (listOfFiles[i].isDirectory()) { type = "DIRECTORY"; }
	    data.put(fileName, type);
	  }
	  return gson.toJson(data);
  }
  
  
}
