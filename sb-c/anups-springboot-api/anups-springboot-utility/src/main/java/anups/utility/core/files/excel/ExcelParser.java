package anups.utility.core.files.excel;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.reflections.Reflections;
import java.lang.reflect.Array;
import java.lang.reflect.Constructor;

import anups.utility.core.files.FileManager;
import anups.utility.core.files.annotations.ExcelColumnMapper;
import anups.utility.core.util.ReflectionBeanManager;

public class ExcelParser {
	
  public ExcelParser(String folderWithFileName, Class<?> className) {
 
  // System.out.println();
   FileManager fileManager = new FileManager();
   String fileExtension = fileManager.getFileExtension(folderWithFileName);
   /* FolderWithFileName - Parse the File get List of columns */
   if("vsc".equalsIgnoreCase(fileExtension)) {
	  /* */
	   BufferedReader br = null;
	   try {
		   br = new BufferedReader(new FileReader(folderWithFileName));
		   int index=0;
		   List<String> columns = new ArrayList<String>();
		   for(String line="";(line=br.readLine())!=null;) {
			 if(index==0) { columns = Arrays.asList(line.split(",")); }   
			 else {
				 
			   List<String> columnData = new ArrayList<String>();
			   columnData = Arrays.asList(line.split(","));
			   System.out.println(columnData);
			   
			  // Class<?> classes =  newInstance();
			   Field[] excelPojoFields = className.getDeclaredFields();
			   Object object = null;
			   try {
				 Constructor<?> ctor = className.getConstructor();
				 object = ctor.newInstance();
				 
				 System.out.println(object);
				 
				 for(Field excelPojoField : excelPojoFields) {
					  if(excelPojoField.isAnnotationPresent(ExcelColumnMapper.class)) {
						ExcelColumnMapper excelColumnMapper = excelPojoField.getAnnotation(ExcelColumnMapper.class);
						String ExcelColumn = excelColumnMapper.value();
						String ExcelPojoColumn = excelPojoField.getName();
						
					 System.out.println(columnData.get(columns.indexOf(ExcelColumn)));
						
					//	ReflectionBeanManager.set(className, ExcelPojoColumn, columnData.get(columns.indexOf(ExcelColumn)));
						
						System.out.println("ExcelColumn: "+ExcelColumn+"  ExcelPojoColumn: "+ExcelPojoColumn);
					  }
				   }
				   
				   
				   
			   } catch (InstantiationException | IllegalAccessException | InvocationTargetException 
					   |NoSuchMethodException | SecurityException e) { e.printStackTrace(); }
			   
			   
			   
			 }
			 index++;
		   }
		   System.out.println(columns);
		   
	   } catch(FileNotFoundException fnfe) {}
	   catch(IOException ioe) {}
	   finally {} 
	  /* */
   }
   
  }
}
