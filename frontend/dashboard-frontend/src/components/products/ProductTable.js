import React, { useEffect, useState } from 'react';
import NewProductForm from './NewProductForm';
import { getProducts, createProduct, deleteProduct, getUOM } from '../../services/ProductsService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const ProductTable = ({ showMsg }) => {
    const [products, setProducts] = useState([]);
    const [unitsOfMeasure, setUnitsOfMeasure] = useState([]);
    const [showNewProductDialog, setShowNewProductDialog] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                showMsg('Error al obtener los productos: ' + error);
            }
        };

        const fetchUnitsOfMeasure = async () => {
            try {
                const fetchedUOM = await getUOM();
                setUnitsOfMeasure(fetchedUOM);
            } catch (error) {
                showMsg('Error al obtener las unidades de medida: ' + error);
            }
        };

        fetchProducts();
        fetchUnitsOfMeasure();
    }, []);

    const handleAddProduct = async (newProduct) => {
        try {
            const p = await createProduct(newProduct);
            newProduct.id = p.idGenerated;
            setProducts([...products, newProduct]);
            showMsg('Producto agregado correctamente.', 'success', 'Éxito');
        } catch (error) {
            showMsg('Error al agregar el producto: ' + error);
        }
    };

    /*
    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            showMsg('Error al eliminar el producto: ' + error);
        }
    };
    */

    const formatProducts = (products) => {
        return products.map(product => {
            return {
                id: product.id,
                name: product.name,
                description: product.description,
                unitOfMeasure: `${product.unitAmount} ${product.unitOfMeasure}`,
                price: product.price,
                hasIva: product.hasIva ? 'Sí' : 'No',
                hasIce: product.hasIce ? 'Sí' : 'No',
            };
        });
    }

    return (
        <div style={{ margin: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Lista de productos</h2>
                <Button label="Agregar producto" className="p-button-raised p-button-success" onClick={() => setShowNewProductDialog(true)} />
            </div>
            <NewProductForm showMsg={ showMsg } UOM={unitsOfMeasure} visible={showNewProductDialog} onHide={() => setShowNewProductDialog(false)} onSubmit={handleAddProduct} />
            <div className="card">
                <DataTable value={formatProducts(products)} paginator rows={7} dataKey="id" emptyMessage="No se encontraron productos.">
                    <Column field="id" header="ID"></Column>
                    <Column field="name" header="Nombre"></Column>
                    <Column field="description" header="Descripción"></Column>
                    <Column field="unitOfMeasure" header="Ud. de medida"></Column>
                    <Column field="price" header="Precio"></Column>
                    <Column field="hasIva" header="IVA"></Column>
                    <Column field="hasIce" header="ICE"></Column>
                    {/*<Column
                        body={(rowData) => (
                            <div className="flex justify-content-around">
                                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => handleDelete(rowData.id)} />
                            </div>
                        )}
                    ></Column>*/}
                </DataTable>
            </div>
        </div>
    );
};

export default ProductTable;
