import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const NewProductForm = ({ showMsg, UOM, visible, onHide, onSubmit }) => {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        unitOfMeasure: "",
        unitAmount: 0,
        price: 0.0,
        hasIva: false,
        hasIce: false
    });

    const validateForm = () => {
        return product.name && product.description && product.unitOfMeasure && product.unitAmount > 0 && product.price > 0;
    };

    const clear = () => {
        setProduct({ name: "", description: "", unitOfMeasure: "", unitAmount: 0, price: 0.0, hasIva: false, hasIce: false });
    };

    const clearAndHide = () => {
        clear();
        onHide();
    };

    const handleSave = () => {
        if (!validateForm()) {
            showMsg("Por favor, completa todos los campos obligatorios. Los campos numéricos deben ser mayores a 0.");
            return;
        }
        onSubmit(product);
        clear();
        onHide();
    };

    return (
        <Dialog
            header="Agregar nuevo producto"
            visible={visible}
            style={{ width: "30vw" }}
            onHide={onHide}
        >
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="name">Nombre del producto</label>
                    <InputText
                        id="name"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="description">Descripción</label>
                    <InputText
                        id="description"
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="unitOfMeasure">Unidad de medida</label>
                    <Dropdown
                        id="unitOfMeasure"
                        value={product.unitOfMeasure}
                        options={UOM}
                        onChange={(e) => setProduct({ ...product, unitOfMeasure: e.value })}
                        placeholder='Seleccione una unidad de medida'
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="unitAmount">Cantidad de unidades</label>
                    <InputNumber
                        id="unitAmount"
                        value={product.unitAmount}
                        onValueChange={(e) => setProduct({ ...product, unitAmount: e.value })}
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="price">Precio</label>
                    <InputNumber
                        id="price"
                        value={product.price}
                        onValueChange={(e) => setProduct({ ...product, price: e.value })}
                        mode="currency"
                        currency="USD"
                        locale="en-US"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="hasIva">Tiene IVA?</label>
                    <div className="p-field-checkbox">
                        <InputSwitch
                            id="hasIva"
                            checked={product.hasIva}
                            onChange={(e) => setProduct({ ...product, hasIva: e.value })}
                        />
                    </div>
                </div>

                <div className="p-field">
                    <label htmlFor="hasIce">Tiene ICE?</label>
                    <div className="p-field-checkbox">
                        <InputSwitch
                            id="hasIce"
                            checked={product.hasIce}
                            onChange={(e) => setProduct({ ...product, hasIce: e.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="p-dialog-footer">
                <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={clearAndHide} />
                <Button label="Guardar" icon="pi pi-check" className="p-button-success" onClick={handleSave} />
            </div>
        </Dialog>
    );
};

export default NewProductForm;
