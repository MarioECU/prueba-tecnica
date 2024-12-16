package com.invsalesapp.controller;

import static com.invsalesapp.config.AppConstants.MSG_SALES_ADD_SUCCESS;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invsalesapp.config.ConfigProperties;
import com.invsalesapp.dto.RequestAddSales;
import com.invsalesapp.dto.ResponseGeneral;
import com.invsalesapp.dto.SalesReport;
import com.invsalesapp.exception.InconsistentDataException;
import com.invsalesapp.service.InventoryService;

import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "sales")
@Api(value = "Sales Management", tags = { "3 Sales Management" })
@AllArgsConstructor
public class SaleController {

	private ConfigProperties configProperties;
	private final InventoryService inventoryService;

	@GetMapping
	public ResponseEntity<List<SalesReport>> getSalesReport() {
		double iva = configProperties.getBusiness().getTaxes().getIva();
		double ice = configProperties.getBusiness().getTaxes().getIce();
		return ResponseEntity.ok(inventoryService.getSalesReport(iva, ice));
	}

	@GetMapping(path = "{storeId}")
	public ResponseEntity<List<SalesReport>> getSalesReportByStoreId(@PathVariable Long storeId) {
		double iva = configProperties.getBusiness().getTaxes().getIva();
		double ice = configProperties.getBusiness().getTaxes().getIce();
		return ResponseEntity.ok(inventoryService.getSalesReportByStore(storeId, iva, ice));
	}

	@GetMapping(path = "taxes")
	public ResponseEntity<ConfigProperties.Business.Taxes> getTaxes() {
		return ResponseEntity.ok(configProperties.getBusiness().getTaxes());
	}

	@PostMapping
	public ResponseEntity<ResponseGeneral> addProductSales(@RequestBody @Valid RequestAddSales request)
			throws InconsistentDataException {
		inventoryService.addProductSales(request);
		return ResponseEntity.ok(new ResponseGeneral(HttpStatus.OK, MSG_SALES_ADD_SUCCESS));
	}
}
