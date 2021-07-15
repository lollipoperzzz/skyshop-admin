/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import {
  DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridCellParams,
} from '@material-ui/data-grid';
import { useSelector } from 'react-redux';
import s from './Products.module.css';
// eslint-disable-next-line import/no-cycle
import { EditModalProduct } from '../AdminPage/EditModal/EditModal';
import { DeleteModal } from '../AdminPage/DeleteModal/DeleteModal';
// eslint-disable-next-line import/named
import { AddProduct } from './AddProduct';
import { deleteProduct } from './store/productsSlice';

const Products = () => {
  // eslint-disable-next-line react/destructuring-assignment
  const goods = useSelector((state) => state.products.list);
  const fields = [
    {
      field: 'id', headerName: 'ID', width: 70, headerAlign: 'center', align: 'center',
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 149,
      headerAlign: 'center',

    },
    {
      field: 'description',
      headerName: 'Description',
      width: 250,
      sortable: false,
      headerAlign: 'center',

    },
    {
      field: 'category',
      headerName: 'Category',
      width: 120,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 110,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params) => `$${params.value}`,
    },
    {
      field: 'edit',
      headerName: '    ',
      width: 100,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        const productIndex = goods.findIndex((obj) => obj.id === params.id);
        return <EditModalProduct product={goods[productIndex]} />;
      },
    },
    {
      field: 'delete',
      headerName: '      ',
      width: 120,
      sortable: false,
      // eslint-disable-next-line no-unused-vars
      renderCell: (params: GridCellParams) => {
        const productIndex = goods.findIndex((obj) => obj.id === params.id);
        const product = goods[productIndex];
        // eslint-disable-next-line max-len
        return <DeleteModal item={product} onDelete={deleteProduct} />;
      },
    }];
  return (
    <div className={s.table}>
      <DataGrid
        rows={goods}
        columns={fields}
        pageSize={10}
        disableColumnMenu
        autoHeight
        components={{
          Toolbar: function CustomToolbar() {
            return (
              <GridToolbarContainer>
                <GridToolbarFilterButton />
                <AddProduct />
              </GridToolbarContainer>
            );
          },
        }}
      />
    </div>
  );
};

export { Products };
