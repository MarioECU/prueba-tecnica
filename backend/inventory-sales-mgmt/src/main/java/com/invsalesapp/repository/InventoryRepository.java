package com.invsalesapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.invsalesapp.entity.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

	List<Inventory> findBySalesQtyGreaterThan(Integer salesQty);

	@Query(nativeQuery = true, value = "SELECT i.* FROM Inventory i WHERE i.id_store = ?1 AND i.sales_qty > ?2")
	List<Inventory> findByStoreIdAndSalesQtyGreaterThan(Long storeId, Integer salesQty);

	@Query(nativeQuery = true, value = "SELECT i.* FROM Inventory i WHERE i.id_store = ?1 AND i.id_product = ?2")
	Optional<Inventory> findByStoreIdAndProductId(Long storeId, Long productId);

	@Transactional
	@Query(nativeQuery = true, value = "INSERT INTO Inventory (id_store, id_product, stock_qty, sales_qty) VALUES (?1, ?2, ?3, ?4) RETURNING *")
	Inventory insertInventory(Long storeId, Long productId, Integer stockQty, Integer salesQty);
}
