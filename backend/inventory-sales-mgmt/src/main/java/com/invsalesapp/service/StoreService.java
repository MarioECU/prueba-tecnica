package com.invsalesapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.invsalesapp.dto.RequestPostStore;
import com.invsalesapp.entity.Store;
import com.invsalesapp.repository.StoreRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StoreService {

	private final StoreRepository storeRepository;

	public List<Store> getAll() {
		return storeRepository.findAll();
	}

	public Store getById(Long id) {
		return storeRepository.findById(id).orElseThrow();
	}

	public Store save(Store store) {
		return storeRepository.saveAndFlush(store);
	}

	public Store create(RequestPostStore store) {
		Store newStore = new Store();
		newStore.setName(store.getName());
		newStore.setAddress(store.getAddress());
		newStore.setPhone(store.getPhone());
		newStore.setEmail(store.getEmail());
		return storeRepository.save(newStore);
	}

	public void delete(Long id) {
		storeRepository.delete(getById(id));
	}
}
