package anups.dat.en.core.app;

import java.io.File;
import java.util.Arrays;
import java.util.Map.Entry;
import java.util.Set;

import org.reflections.Reflections;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import anups.dat.en.core.annotations.HtmlDataConfiguration;
import anups.dat.en.core.app.util.HtmlDataInitializerUtil;
import anups.utility.core.files.ClassPathManager;
import anups.utility.core.files.FileManager;

@Component
public class HtmlDataInitializer {
	
 private String PROJECT_PATH = System.getProperty("user.dir");
 
 private String HTML_SRC_PATH =  "src\\main\\gen\\html";
		 
 private String HTML_SRC_DIRECTORY = PROJECT_PATH + "\\" + HTML_SRC_PATH;
 
 private String RESOURCE_STATIC_DIRECTORY;
 
 private String DEFAULT_PACKAGE;
 
 private String[] BASE_PACKAGES;
 
 public HtmlDataInitializer() {
  
  /* <classpathentry kind="src" path="src/main/gen"/> to .classPath */
  new ClassPathManager().addSrcFolder(HTML_SRC_PATH);
  
  
  Set<Class<?>> classNames = new Reflections("").getTypesAnnotatedWith(HtmlDataConfiguration.class);
  for(Class<?> className : classNames) {
    HtmlDataConfiguration htmlDataConfiguration = className.getAnnotation(HtmlDataConfiguration.class);
	FileManager fileManager = new FileManager();
	RESOURCE_STATIC_DIRECTORY = PROJECT_PATH + "\\" + htmlDataConfiguration.defaultPath(); // resources/static Path
	DEFAULT_PACKAGE = htmlDataConfiguration.defaultPackage();
	BASE_PACKAGES = htmlDataConfiguration.basePath();
		 
	System.out.println("RESOURCE_STATIC_DIRECTORY: "+RESOURCE_STATIC_DIRECTORY);
	System.out.println("DEFAULT_PACKAGE: "+DEFAULT_PACKAGE);
	System.out.println("BASE_PACKAGES: "+Arrays.toString(BASE_PACKAGES));
	System.out.println("HTML_SRC_DIRECTORY: "+HTML_SRC_DIRECTORY);
	/* ====================================================
	 * Check the defined Packages Exists or not 
	 * ====================================================
	 * IF EXISTS, delete 
	 * THEN create
	 */
	for(int index=0;index<BASE_PACKAGES.length;index++) {
	  String folderPackage = DEFAULT_PACKAGE+"."+BASE_PACKAGES[index];
	  String fromFolderPath = RESOURCE_STATIC_DIRECTORY+"\\"+BASE_PACKAGES[index];
	  String toFolderPath = HTML_SRC_DIRECTORY+"\\"+DEFAULT_PACKAGE+"\\"+BASE_PACKAGES[index];
	  String[] ignoreFOF = {};
	  boolean isDeleted =  fileManager.deleteAFolder(HTML_SRC_DIRECTORY+"\\"+DEFAULT_PACKAGE, BASE_PACKAGES[index], false);
	  boolean isCreated = fileManager.createAFolder(HTML_SRC_DIRECTORY, folderPackage);
	  HtmlDataInitializerUtil htmlDataInitializerUtil = new HtmlDataInitializerUtil();
	  htmlDataInitializerUtil.packagesAndClassesBuilder(DEFAULT_PACKAGE, fromFolderPath, toFolderPath, ignoreFOF);
	} 
 }
}
 
 
}
