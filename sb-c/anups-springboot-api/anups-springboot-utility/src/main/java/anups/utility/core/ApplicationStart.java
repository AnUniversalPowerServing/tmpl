package anups.utility.core;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import anups.utility.core.files.excel.test.ExcelReader;

@SpringBootApplication
public class ApplicationStart implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(ApplicationStart.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		new ExcelReader().execute();
	}

}
