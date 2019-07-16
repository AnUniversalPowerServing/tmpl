package anups.chat.builder.app;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"anups"})
public class ApplicationStart  implements CommandLineRunner {

  public static void main(String[] args) {
    SpringApplication.run(ApplicationStart.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
		 
  }
  
}
