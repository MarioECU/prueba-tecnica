package com.invsalesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.invsalesapp.entity.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {

}
