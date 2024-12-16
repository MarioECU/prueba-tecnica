package com.invsalesapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;

@Data
@Entity
@Table(
    uniqueConstraints = {@UniqueConstraint(columnNames = {"id_product", "id_store"})}
)
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_product", nullable = false, referencedColumnName = "id")
    private Product product;

    @Column(nullable = false)
    private Integer stockQty;

    @Column(columnDefinition = "INTEGER DEFAULT 0")
    private Integer salesQty;
}

