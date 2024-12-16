package com.invsalesapp.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class RequestAddStock {

	@NotNull
	private Long productId;

	@NotNull
	private Long storeId;

	@NotNull
	@Min(1)
	private Integer stockQty;
}
