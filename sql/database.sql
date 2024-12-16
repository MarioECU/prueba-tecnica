CREATE USER testing WITH PASSWORD 'testing';
CREATE DATABASE invsalesapp WITH OWNER testing;
\c invsalesapp

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    unit_of_measure VARCHAR(2) NOT NULL,
    unit_amount INTEGER NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    has_iva BOOLEAN NOT NULL,
    has_ice BOOLEAN NOT NULL
);

CREATE TABLE store (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(12) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    id_product INTEGER NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    id_store INTEGER NOT NULL REFERENCES store(id) ON DELETE CASCADE,
    stock_qty INTEGER NOT NULL,
    sales_qty INTEGER DEFAULT 0,
    UNIQUE (id_product, id_store)
);

INSERT INTO product (name, description, unit_of_measure, unit_amount, price, has_iva, has_ice) VALUES ('Arroz', 'Saco de arroz de 25 kg', 'KG', 25, 35.00, TRUE, FALSE), ('Aceite', 'Aceite vegetal comestible de 1 litro', 'LT', 1, 3.50, TRUE, FALSE), ('Huevos', 'Cartón de 12 huevos frescos', 'UN', 12, 2.70, TRUE, FALSE), ('Azúcar', 'Azúcar refinada en funda de 1 kg', 'KG', 1, 1.50, TRUE, FALSE), ('Leche', 'Caja de leche entera pasteurizada de 1 litro', 'LT', 1, 1.25, TRUE, FALSE), ('Pan', 'Unidad de pan francés fresco', 'UN', 1, 0.20, TRUE, FALSE), ('Cola', 'Botella de 2 litros de bebida gaseosa', 'LT', 2, 1.90, TRUE, TRUE), ('Atún', 'Lata de atún en aceite de 170 g', 'G', 170, 2.00, TRUE, FALSE), ('Harina', 'Funda de harina de trigo de 1 kg', 'KG', 1, 1.10, TRUE, FALSE), ('Cerveza', 'Botella de cerveza Pilsener de 600 ml', 'ML', 600, 1.60, TRUE, TRUE); INSERT INTO store (name, address, phone, email) VALUES ('Comisariato Central', 'Av. 9 de Octubre y García Moreno, Centro', '0987654321', 'central@comisariato.com'), ('Sucursal Norte', 'Av. de las Américas y Juan Tanca Marengo', '0991234567', 'norte@comisariato.com'), ('Sucursal Sur', 'Av. 25 de Julio y José de Antepara', '0976543210', 'sur@comisariato.com'); INSERT INTO inventory (id_product, id_store, stock_qty, sales_qty) VALUES (1, 1, 500, 150), (2, 1, 200, 50), (3, 2, 300, 100), (4, 2, 100, 30), (5, 3, 400, 120), (6, 3, 800, 400), (7, 1, 50, 20), (8, 2, 150, 45), (9, 3, 120, 40), (10, 1, 60, 30);

GRANT ALL PRIVILEGES ON DATABASE invsalesapp TO testing;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO testing;

