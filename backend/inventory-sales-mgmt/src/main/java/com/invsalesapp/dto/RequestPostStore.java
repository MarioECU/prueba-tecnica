package com.invsalesapp.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.Getter;

@Getter
public class RequestPostStore {

	@NotEmpty
	@Size(max = 100)
	private String name;

	@NotEmpty
	@Size(max = 255)
	private String address;

	@NotEmpty
	@Size(max = 12)
	private String phone;

	@NotEmpty
	@Size(max = 100)
	private String email;
}
