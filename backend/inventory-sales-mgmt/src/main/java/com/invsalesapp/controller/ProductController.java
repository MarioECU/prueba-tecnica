package com.invsalesapp.controller;

import static com.invsalesapp.config.AppConstants.MSG_CREATION_SUCCESS;
import static com.invsalesapp.config.AppConstants.MSG_DELETION_SUCCESS;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invsalesapp.dto.RequestPostProduct;
import com.invsalesapp.dto.ResponseCreation;
import com.invsalesapp.dto.ResponseGeneral;
import com.invsalesapp.entity.Product;
import com.invsalesapp.entity.UnitOfMeasure;
import com.invsalesapp.service.ProductService;

import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "product")
@Api(value = "Product Management", tags = { "1 Product Management" })
@AllArgsConstructor
public class ProductController {

	private final ProductService productService;

	@GetMapping
	public ResponseEntity<List<Product>> getAll() {
		System.out.println("ProductController.getAll()");
		return new ResponseEntity<>(productService.getAll(), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<ResponseGeneral> register(@RequestBody @Valid RequestPostProduct user) {
		Product p = productService.create(user);
		return new ResponseEntity<>(new ResponseCreation(HttpStatus.CREATED, MSG_CREATION_SUCCESS, p.getId()),
				HttpStatus.CREATED);
	}

	@DeleteMapping(path = "{id}")
	public ResponseEntity<ResponseGeneral> delete(@PathVariable Long id) {
		productService.delete(id);
		return ResponseEntity.ok(new ResponseGeneral(HttpStatus.OK, String.format(MSG_DELETION_SUCCESS, id)));
	}

	@GetMapping(path = "uom")
	public ResponseEntity<UnitOfMeasure[]> getUOM() {
		System.out.println("ProductController.getUOM()");
		return new ResponseEntity<>(UnitOfMeasure.values(), HttpStatus.OK);
	}

	@GetMapping(path = "notInStore/{storeId}")
	public ResponseEntity<List<Product>> getProductsNotInStore(@PathVariable Long storeId) {
		System.out.println("ProductController.getProductsNotInStore()");
		return new ResponseEntity<>(productService.getProductsNotInStore(storeId), HttpStatus.OK);
	}
}
