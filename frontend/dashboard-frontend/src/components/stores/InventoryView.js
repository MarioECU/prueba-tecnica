import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { getProductsNotInStore } from '../../services/ProductsService';
import { updateStock } from '../../services/StoresService';

const InventoryView = ({ storeData, visible, showMsg, onHide, updateData }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [stockQty, setStockQty] = useState(1);
    const [store, setStore] = useState(storeData);
    const [newStockQty, setNewStockQty] = useState(1);
    const [editingInventoryId, setEditingInventoryId] = useState(null);

    const fetchProducts = async () => {
        try {
            console.log('storeData', storeData)
            const fetchedProducts = await getProductsNotInStore(storeData.id);
            setProducts(fetchedProducts);
        } catch (error) {
            showMsg('Error al obtener los productos no asignados: ' + error);
        }
    };

    useEffect(() => {
        setStore(storeData);

        if (storeData.id)
            fetchProducts();
    }, [storeData]);

    const validateForm = () => selectedProduct && stockQty > 0;

    const handleAddInventory = async () => {
        if (!validateForm()) {
            showMsg("Por favor, selecciona un producto y asigna una cantidad mayor a 0.");
            return;
        }
        try {
            await updateStock(selectedProduct.id, store.id, stockQty);
            showMsg("Inventario actualizado correctamente.", "success", "Éxito");
            setStockQty(1);
            setSelectedProduct(null);
            fetchProducts();
            updateData();
        } catch (error) {
            showMsg('Error al registrar el inventario: ' + error);
        }
    };

    const handleConfirmUpdate = async (productId) => {
        try {
            await updateStock(productId, store.id, newStockQty);
            showMsg("Inventario actualizado correctamente.", "success", "Éxito");
            setEditingInventoryId(null);
            setNewStockQty(1);
            updateData();
        } catch (error) {
            showMsg('Error al actualizar el inventario: ' + error);
        }
    }

    return (
        <Dialog
            header={`Inventario del local: ${store.name}`}
            visible={visible}
            style={{ width: "80vw" }}
            onHide={onHide}
        >
            <div style={{ display: "flex", gap: "2rem" }}>
                <div style={{ flex: 2, maxHeight: "400px", overflowY: "auto", paddingRight: "1rem" }}>
                    {store.inventories.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <p><strong>No hay productos en inventario para este local.</strong></p>
                        </div>
                    ) : (
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "1rem",
                        }}>
                            {store.inventories.map((inventory) => (
                                <Card
                                    key={inventory.id}
                                    title={inventory.product.name}
                                    subTitle={`Presentación: ${inventory.product.unitAmount} ${inventory.product.unitOfMeasure}`}
                                    style={{ marginBottom: "1em" }}
                                >
                                    <p><strong>Descripción:</strong> {inventory.product.description}</p>
                                    <p><strong>Precio:</strong> ${inventory.product.price.toFixed(2)}</p>
                                    <p><strong>Stock:</strong> {inventory.stockQty}</p>
                                    {editingInventoryId === inventory.id ? (
                                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                            <InputText
                                                value={newStockQty}
                                                type="number"
                                                min={1}
                                                placeholder="Cantidad"
                                                onChange={(e) => setNewStockQty(Number(e.target.value))}
                                                style={{ width: "70px" }}
                                            />
                                            <Button
                                                icon="pi pi-check"
                                                className="p-button-success"
                                                onClick={() => handleConfirmUpdate(inventory.product.id)}
                                                tooltip="Confirmar"
                                            />
                                            <Button
                                                icon="pi pi-times"
                                                className="p-button-danger"
                                                onClick={() => setEditingInventoryId(null)}
                                                tooltip="Cancelar"
                                            />
                                        </div>
                                    ) : (
                                        <Button
                                            icon="pi pi-plus"
                                            className="p-button-rounded p-button-success"
                                            onClick={() => {
                                                setEditingInventoryId(inventory.id);
                                                setNewStockQty(1);
                                            }}
                                            tooltip="Agregar al stock"
                                        />
                                    )}
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ flex: 1, padding: "1rem", borderLeft: "1px solid #ccc" }}>
                    <h3>Agregar nuevo producto al inventario</h3>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="product">Producto</label>
                            <Dropdown
                                id="product"
                                optionLabel="name"
                                value={selectedProduct}
                                options={products}
                                onChange={(e) => setSelectedProduct(e.value)}
                                placeholder="Seleccione un producto"
                            />
                        </div>

                        <div className="p-field">
                            <label htmlFor="stockQty">Cantidad en stock</label>
                            <InputText
                                id="stockQty"
                                type="number"
                                value={stockQty}
                                onChange={(e) => setStockQty(Number(e.target.value))}
                            />
                        </div>

                        <Button
                            label="Guardar"
                            icon="pi pi-check"
                            className="p-button-success"
                            onClick={handleAddInventory}
                            disabled={!validateForm()}
                        />
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default InventoryView;
