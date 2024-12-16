package com.invsalesapp.dto;

import java.math.BigDecimal;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SalesReport {

	private String productName;
	private Integer salesQty;
	private BigDecimal salesAmount;
	private Integer remainingStock;
}
