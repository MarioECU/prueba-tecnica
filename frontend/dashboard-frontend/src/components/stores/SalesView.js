import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { addSales } from '../../services/SalesService';

const SalesView = ({ storeData, visible, showMsg, onHide, updateData }) => {
    const [store, setStore] = useState(storeData);
    const [newSalesQty, setNewSalesQty] = useState(1);
    const [editingInventoryId, setEditingInventoryId] = useState(null);

    useEffect(() => {
        setStore(storeData);
    }, [storeData]);

    const handleConfirmUpdate = async (productId) => {
        try {
            await addSales(productId, store.id, newSalesQty);
            showMsg("Venta registrada correctamente.", "success", "Éxito");
            setEditingInventoryId(null);
            setNewSalesQty(1);
            updateData();
        } catch (error) {
            showMsg('Error al registrar la venta: ' + error.response.data.message);
        }
    }

    return (
        <Dialog
            header={`Productos disponibles para ventas en ${store.name}`}
            visible={visible}
            style={{ width: "80vw" }}
            onHide={onHide}
        >
            <div style={{ display: "flex", gap: "2rem" }}>
                <div style={{ flex: 2, maxHeight: "400px", overflowY: "auto", paddingRight: "1rem" }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "1rem",
                    }}>
                        {store.inventories.filter((inventory) => inventory.stockQty > 0).map((inventory) => (
                            <Card
                                key={inventory.id}
                                title={inventory.product.name}
                                subTitle={`Presentación: ${inventory.product.unitAmount} ${inventory.product.unitOfMeasure}`}
                                style={{ marginBottom: "1em" }}
                            >
                                <p><strong>Descripción:</strong> {inventory.product.description}</p>
                                <p><strong>Precio:</strong> ${inventory.product.price.toFixed(2)}</p>
                                <p><strong>Stock:</strong> {inventory.stockQty}</p>
                                <p><strong>Ventas:</strong> {inventory.salesQty}</p>
                                {editingInventoryId === inventory.id ? (
                                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                        <InputText
                                            value={newSalesQty}
                                            type="number"
                                            min={1}
                                            placeholder="Cantidad"
                                            onChange={(e) => setNewSalesQty(Number(e.target.value))}
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
                                            setNewSalesQty(1);
                                        }}
                                        tooltip="Registrar cantidad vendida"
                                    />
                                )}
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default SalesView;
