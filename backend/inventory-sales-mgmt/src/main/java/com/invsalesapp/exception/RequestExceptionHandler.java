package com.invsalesapp.exception;

import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.invsalesapp.dto.ResponseGeneral;

@ControllerAdvice
public class RequestExceptionHandler {

	@ExceptionHandler({ HttpMessageNotReadableException.class, MethodArgumentNotValidException.class })
	public ResponseEntity<ResponseGeneral> handleValidationExceptions(Exception ex) {
		return new ResponseEntity<>(new ResponseGeneral(HttpStatus.BAD_REQUEST, ex.getMessage().split(";")[0]),
				HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(NoSuchElementException.class)
	public ResponseEntity<ResponseGeneral> handleNoSuchElementException(NoSuchElementException ex) {
		return new ResponseEntity<>(new ResponseGeneral(HttpStatus.NOT_FOUND, ex.getMessage()), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(InconsistentDataException.class)
	public ResponseEntity<ResponseGeneral> handleInconsistentDataException(InconsistentDataException ex) {
		return new ResponseEntity<>(new ResponseGeneral(HttpStatus.CONFLICT, ex.getMessage()), HttpStatus.CONFLICT);
	}
}
