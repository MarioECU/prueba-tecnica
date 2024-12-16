package com.invsalesapp.controller;

import static com.invsalesapp.config.AppConstants.MSG_CREATION_SUCCESS;
import static com.invsalesapp.config.AppConstants.MSG_DELETION_SUCCESS;
import static com.invsalesapp.config.AppConstants.MSG_STOCK_UPDATE_SUCCESS;

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

import com.invsalesapp.dto.RequestAddStock;
import com.invsalesapp.dto.RequestPostStore;
import com.invsalesapp.dto.ResponseCreation;
import com.invsalesapp.dto.ResponseGeneral;
import com.invsalesapp.entity.Store;
import com.invsalesapp.service.InventoryService;
import com.invsalesapp.service.StoreService;

import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "store")
@Api(value = "Store Management", tags = { "2 Store Management" })
@AllArgsConstructor
public class StoreController {

	private final StoreService storeService;
	private final InventoryService inventoryService;

	@GetMapping
	public ResponseEntity<List<Store>> getAll() {
		return new ResponseEntity<>(storeService.getAll(), HttpStatus.OK);
	}

	@GetMapping(path = "{id}")
	public ResponseEntity<Store> getById(@PathVariable Long id) {
		return ResponseEntity.ok(storeService.getById(id));
	}

	@PostMapping
	public ResponseEntity<ResponseGeneral> register(@RequestBody @Valid RequestPostStore store) {
		Store s = storeService.create(store);
		return new ResponseEntity<>(new ResponseCreation(HttpStatus.CREATED, MSG_CREATION_SUCCESS, s.getId()),
				HttpStatus.CREATED);
	}

	@DeleteMapping(path = "{id}")
	public ResponseEntity<ResponseGeneral> delete(@PathVariable Long id) {
		storeService.delete(id);
		return ResponseEntity.ok(new ResponseGeneral(HttpStatus.OK, String.format(MSG_DELETION_SUCCESS, id)));
	}

	@PostMapping(path = "update-stock")
	public ResponseEntity<ResponseGeneral> updateProductStock(@RequestBody @Valid RequestAddStock request) {
		System.out.println("Executing with request: " + request);
		inventoryService.updateProductStock(request);
		return ResponseEntity.ok(new ResponseGeneral(HttpStatus.OK, MSG_STOCK_UPDATE_SUCCESS));
	}
}
