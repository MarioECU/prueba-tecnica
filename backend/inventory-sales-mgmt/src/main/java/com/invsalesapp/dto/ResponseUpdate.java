package com.invsalesapp.dto;

import org.springframework.http.HttpStatus;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class ResponseUpdate<T> extends ResponseGeneral {

	private T result;

	public ResponseUpdate(HttpStatus status, String message, T result) {
		super(status, message);
		this.result = result;
	}
}
