package anups.utility.core.files;

import java.io.File;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

public class ClassPathManager {

	public static final String CLASSPATH = System.getProperty("user.dir")+"\\.classpath";
	
	public void addSrcFolder(String folderName) {
		try { 
			  DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			  DocumentBuilder builder = factory.newDocumentBuilder();
			  Document document = builder.parse(new File(CLASSPATH));
			 
			  Element element = document.getDocumentElement();
			  
		      Element node = document.createElement("classpathentry");
		              node.setAttribute("kind", "src");
		              node.setAttribute("path", folderName);

		      element.appendChild(node);
		      
		      DOMSource source = new DOMSource(document);
		      TransformerFactory transformerFactory = TransformerFactory.newInstance();
		      Transformer transformer = transformerFactory.newTransformer();
		      StreamResult result = new StreamResult(CLASSPATH);
		      transformer.transform(source, result);

		} catch (Exception e) { e.printStackTrace(); }
	}
	
	public static void main(String args[]) {
	 
	}

}
