package com.invsalesapp.dto;

import java.math.BigDecimal;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.invsalesapp.entity.UnitOfMeasure;

import lombok.Getter;

@Getter
public class RequestPostProduct {

	@NotEmpty
	@Size(max = 100)
	private String name;

	@NotEmpty
	private String description;

	@NotNull
	private UnitOfMeasure unitOfMeasure;

	@NotNull
	@Min(1)
	private Integer unitAmount;

	@NotNull
	@DecimalMin(value = "0.0", inclusive = false)
	private BigDecimal price;

	@NotNull
	private boolean hasIva;

	@NotNull
	private boolean hasIce;
}
