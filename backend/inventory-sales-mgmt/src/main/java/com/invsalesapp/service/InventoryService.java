package com.invsalesapp.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.invsalesapp.dto.RequestAddSales;
import com.invsalesapp.dto.RequestAddStock;
import com.invsalesapp.dto.SalesReport;
import com.invsalesapp.entity.Inventory;
import com.invsalesapp.entity.Store;
import com.invsalesapp.exception.InconsistentDataException;
import com.invsalesapp.repository.InventoryRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class InventoryService {

	private final StoreService storeService;
	private final InventoryRepository inventoryRepository;

	public void updateProductStock(RequestAddStock request) {
		Optional<Inventory> inventory = inventoryRepository.findByStoreIdAndProductId(request.getStoreId(),
				request.getProductId());
		if (inventory.isPresent()) {
			inventory.get().setStockQty(inventory.get().getStockQty() + request.getStockQty());
		} else {
			addProductStock(request);
		}
	}

	private void addProductStock(RequestAddStock request) {
		Store store = storeService.getById(request.getStoreId());
		Inventory inventory = inventoryRepository.insertInventory(request.getStoreId(), request.getProductId(), request.getStockQty(), 0);
		store.getInventories().add(inventory);
	}

	public void addProductSales(RequestAddSales request) throws InconsistentDataException {
		Inventory inventory = inventoryRepository
				.findByStoreIdAndProductId(request.getStoreId(), request.getProductId()).orElseThrow();
		if (inventory.getStockQty() < request.getSalesQty()) {
			throw new InconsistentDataException("Insufficient stock");
		}
		inventory.setSalesQty(inventory.getSalesQty() + request.getSalesQty());
		inventory.setStockQty(inventory.getStockQty() - request.getSalesQty());
		inventoryRepository.save(inventory);
	}

	public List<SalesReport> getSalesReport(double iva, double ice) {
		List<Inventory> salesInventory = inventoryRepository.findBySalesQtyGreaterThan(0);
        return fromInventoryListToSalesReportList(salesInventory, iva, ice);
	}

	public List<SalesReport> getSalesReportByStore(Long storeId, double iva, double ice) {
		storeService.getById(storeId);
		List<Inventory> salesInventory = inventoryRepository.findByStoreIdAndSalesQtyGreaterThan(storeId, 0);
        return fromInventoryListToSalesReportList(salesInventory, iva, ice);
	}

	private List<SalesReport> fromInventoryListToSalesReportList(List<Inventory> salesInventory, double iva, double ice) {
		List<SalesReport> salesReport = new ArrayList<>();
		salesInventory.forEach(inventory -> {
			SalesReport report = new SalesReport();
			report.setProductName(inventory.getProduct().getName());
			report.setSalesQty(inventory.getSalesQty());
			report.setSalesAmount(inventory.getProduct().getPrice().multiply(BigDecimal.valueOf(inventory.getSalesQty())));
			if (inventory.getProduct().isHasIva()) {
				report.setSalesAmount(report.getSalesAmount().multiply(
						BigDecimal.valueOf(1 + iva)));
			}
			if (inventory.getProduct().isHasIce()) {
				report.setSalesAmount(report.getSalesAmount()
						.multiply(BigDecimal.valueOf(1 + ice)));
			}
			report.setRemainingStock(inventory.getStockQty());
			salesReport.add(report);
		});
		return salesReport;
	}
}
