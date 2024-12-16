package com.invsalesapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.invsalesapp.dto.RequestPostProduct;
import com.invsalesapp.entity.Product;
import com.invsalesapp.repository.ProductRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {

	private final ProductRepository productRepository;
	private final StoreService storeService;

    public List<Product> getAll() {
        return productRepository.findAll();
    }

	public Product getById(Long id) {
		return productRepository.findById(id).orElseThrow();
	}

	public Product create(RequestPostProduct product) {
		Product newProduct = new Product();
		newProduct.setName(product.getName());
		newProduct.setDescription(product.getDescription());
		newProduct.setUnitOfMeasure(product.getUnitOfMeasure());
		newProduct.setUnitAmount(product.getUnitAmount());
		newProduct.setPrice(product.getPrice());
		newProduct.setHasIva(product.isHasIva());
		newProduct.setHasIce(product.isHasIce());
		return productRepository.save(newProduct);
	}

    public void delete(Long id) {
        productRepository.delete(getById(id));
    }

	public List<Product> getProductsNotInStore(Long storeId) {
		storeService.getById(storeId);
		return productRepository.findProductsNotInStore(storeId);
	}
}
