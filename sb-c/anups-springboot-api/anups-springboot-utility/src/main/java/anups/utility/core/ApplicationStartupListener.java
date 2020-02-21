package anups.utility.core;

import java.util.Set;

import org.reflections.Reflections;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.Arrays;

import anups.utility.core.files.annotations.ExcelColumnMapper;

@Component
public class ApplicationStartupListener implements ApplicationListener<ContextRefreshedEvent> {

   @Override
   public void onApplicationEvent(final ContextRefreshedEvent event) {
	 ApplicationContext applicationContext = event.getApplicationContext();
	 
   }

}
