package anups.utility.core.browser;

import java.io.IOException;


public class DefaultBrowser {

 public DefaultBrowser() { }
 
 public static void openURL(String url) {
   Runtime runtime = Runtime.getRuntime();
   String os = System.getProperty("os.name").toLowerCase();
   try {
	      if (os.indexOf("win") >= 0) { runtime.exec("rundll32 url.dll,FileProtocolHandler " + url); } 
	 else if (os.indexOf("mac") >= 0) {	runtime.exec("open " + url); } 
	 else if (os.indexOf("nix") >= 0 || os.indexOf("nux") >= 0) {
				String[] browsers = { "epiphany", "firefox", "mozilla", "konqueror", "netscape", "opera", "links", "lynx" };
				StringBuffer cmd = new StringBuffer();
				for (int i = 0; i < browsers.length; i++)
					if(i == 0) { cmd.append(String.format(    "%s \"%s\"", browsers[i], url)); } 
					else { cmd.append(String.format(" || %s \"%s\"", browsers[i], url)); }	
				    runtime.exec(new String[] { "sh", "-c", cmd.toString() }); } 
	 else { System.out.println("Your OS is not support!!"); }    
   } catch (IOException e) {  e.printStackTrace(); }
 }
 
}
