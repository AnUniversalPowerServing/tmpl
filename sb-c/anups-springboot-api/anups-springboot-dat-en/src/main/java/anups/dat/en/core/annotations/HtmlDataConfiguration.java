package anups.dat.en.core.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface HtmlDataConfiguration {
 String defaultPath() default "src\\main\\resources\\static";
 String[] basePath();
 String defaultPackage();
}
