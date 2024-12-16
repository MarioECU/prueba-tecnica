package com.invsalesapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.invsalesapp.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query(nativeQuery = true, value = "SELECT * FROM product WHERE id NOT IN (SELECT id_product FROM inventory WHERE id_store = :storeId)")
	List<Product> findProductsNotInStore(@Param("storeId") Long storeId);
}
