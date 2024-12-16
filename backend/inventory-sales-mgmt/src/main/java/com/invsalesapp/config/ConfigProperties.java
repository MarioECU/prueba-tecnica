package com.invsalesapp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties
public class ConfigProperties {

	private Business business;

	@Data
	public static class Business {
		private Taxes taxes;

		@Data
		public static class Taxes {
			private double iva;
			private double ice;
		}
	}
}
