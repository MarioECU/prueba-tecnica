import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { getProductsNotInStore } from '../../services/ProductsService';
import { updateStock } from '../../services/StoresService';

const NewInventoryForm = ({ storeObj, showMsg, visible, onHide }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [stockQty, setStockQty] = useState(1);

    useEffect(() => {
        const fetchProductsNotInStore = async () => {
            try {
                const fetchedProducts = await getProductsNotInStore(storeObj.id);
                setProducts(fetchedProducts);
            } catch (error) {
                showMsg('Error al obtener los productos no asignados: ' + error);
            }
        };

        fetchProductsNotInStore();
    }, []);

    const validateForm = () => {
        return selectedProduct && stockQty > 0;
    };

    const clear = () => {
        setStockQty(1);
        setSelectedProduct(null);
    };

    const clearAndHide = () => {
        clear();
        onHide();
    };

    const handleSave = () => {
        if (!validateForm()) {
            showMsg("Por favor, selecciona un producto y asigna una cantidad mayor a 0.");
            return;
        }
        try {
            updateStock(selectedProduct.id, storeObj.id, stockQty);
        } catch (error) {
            showMsg('Error al registrar el inventario: ' + error);
            return;
        }
        clear();
        onHide();
    };
// form with dropdown and input number
    return (
        <Dialog
            header={`Agregar nuevo inventario a ${storeObj.name}`}
            visible={visible}
            style={{ width: "30vw" }}
            onHide={onHide}
        >
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
                        onChange={(e) => setStockQty(e.target.value)}
                    />
                </div>

            </div>

            <div className="p-dialog-footer">
                <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={clearAndHide} />
                <Button label="Guardar" icon="pi pi-check" className="p-button-success" onClick={handleSave} />
            </div>
        </Dialog>
    );
};

export default NewInventoryForm;
