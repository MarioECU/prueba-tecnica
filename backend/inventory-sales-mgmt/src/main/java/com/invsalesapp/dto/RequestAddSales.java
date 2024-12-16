package com.invsalesapp.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.Getter;

@Getter
public class RequestAddSales {

	@NotNull
	private Long productId;

	@NotNull
	private Long storeId;

	@NotNull
	@Min(1)
	private Integer salesQty;
}
