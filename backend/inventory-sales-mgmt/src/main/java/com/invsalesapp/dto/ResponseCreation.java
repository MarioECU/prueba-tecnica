package com.invsalesapp.dto;

import org.springframework.http.HttpStatus;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class ResponseCreation extends ResponseGeneral {

	private Long idGenerated;

	public ResponseCreation(HttpStatus status, String message, Long idGenerated) {
		super(status, message);
		this.idGenerated = idGenerated;
	}

}
