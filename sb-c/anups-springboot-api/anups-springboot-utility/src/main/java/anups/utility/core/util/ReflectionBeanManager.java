package anups.utility.core.util;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;

public class ReflectionBeanManager {
/* ====================================
 * CLASS DESCRIPTION :
 * ====================================
 * This is used to set and get Data from Beans using Reflections
 *
 **/
  public static void set(Class<?> obj, String fieldName, Object value){
	PropertyDescriptor pd;
	try {
	 //  pd = new PropertyDescriptor(fieldName, obj.getClass());
	   pd = new PropertyDescriptor(fieldName, Class.forName(obj.getCanonicalName()));
	   pd.getWriteMethod().invoke(obj, value);
	} catch (IntrospectionException | IllegalAccessException | ClassNotFoundException | IllegalArgumentException | InvocationTargetException e) {
		e.printStackTrace();
	}
  }

  public static void get(Object obj, String fieldName){
    PropertyDescriptor pd;
	try {
	  pd = new PropertyDescriptor(fieldName, obj.getClass());
	  System.out.println("" + pd.getReadMethod().invoke(obj));
	} catch (IntrospectionException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
	   e.printStackTrace();
	}
  }
  
}
