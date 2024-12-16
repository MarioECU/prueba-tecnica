package com.invsalesapp.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum UnitOfMeasure {

	KG("Kilogram", "Kilogramo"),
	G("Gram", "Gramo"),
	LT("Liter", "Litro"),
	ML("Milliliter", "Mililitro"),
	UN("Unit", "Unidad");

	private final String description;
	private final String spanishDescription;
}
