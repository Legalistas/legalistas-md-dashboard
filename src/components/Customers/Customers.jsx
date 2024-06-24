"use client"
import React, { useState, useEffect } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { CiMail, CiUser, CiMobile3, CiMap } from "react-icons/ci";
import { getCuscomers, updateCuscomer, deleteCuscomer } from '@/services/users'; // Ajusta la ruta según sea necesario
import SearchInput from "./Component/SearchInput";
import { Button, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure, Checkbox, Link } from "@nextui-org/react";
import { PlusIcon } from "../Icons/PlusIcon";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const Customers = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('year');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // JavaScript months are 0-based
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const columns = React.useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Cliente', accessor: 'client' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Teléfono', accessor: 'phone' },
    { Header: 'Provincia', accessor: 'state' },
    { Header: 'Cuidad', accessor: 'locality' },
    {
      Header: 'Acciones',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <Button auto onClick={() => handleEdit(row.original)}>Editar</Button>
          <Button auto color="danger" onClick={() => handleDelete(row.original.id)}>Eliminar</Button>
        </div>
      )
    }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 } // Set the initial page size
    },
    useGlobalFilter,
    usePagination,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCuscomers();
        console.log(response)
        const extractedData = response.map(item => {
          const { id, email, profile: { firstname, lastname, characteristic, phone, states, localities } } = item;
          return {
            id,
            email,
            client: `${firstname} ${lastname}`,
            phone: characteristic + phone,
            state: `${states?.name}`,
            locality: `${localities?.name}`
          };
        });
        setData(extractedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(data)
  }, [data])

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    onOpen();
  };

  const handleDelete = async (id) => {
    try {
      await deleteCuscomer(id);
      setData(data.filter(customer => customer.id !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleUpdateCustomer = async () => {
    try {
      await updateCuscomer(selectedCustomer.id, selectedCustomer);
      setData(data.map(customer => customer.id === selectedCustomer.id ? selectedCustomer : customer));
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark max-w-full'>
      {/* Header */}
      <div className="flex items-center justify-between rounded p-2.5">
        <SearchInput
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          isLoading={isLoading}
        />

        <div className="flex w-1/2 items-center justify-end gap-2">
          <Link href="/customers/create">
            <Button
              color="primary"
              variant="bordered"
              className="bordered-primary dark:bordered-primary rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90 active:bg-primary/80 dark:bg-primary dark:text-white dark:hover:bg-primary/90 dark:active:bg-primary/80"
              startContent={<PlusIcon />}
            >
              Nuevo miembro
            </Button>
          </Link>
          <select
            id="rows"
            value={pageSize}
            className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block min-w-[80px] rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              gotoPage(0); // Ir a la primera página cuando se cambia el tamaño de la página
            }}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="container max-w-full">
        <div className='max-w-full'>
          <table {...getTableProps()} className="min-w-full divide-y divide-gray-200 max-w-full">
            <thead className="bg-gray-50">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, cellIndex) => (
                    <th {...column.getHeaderProps()} className={`px-2 py-3 ${cellIndex === 0 ? 'text-left' : 'text-center'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="bg-white max-w-full">
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, cellIndex) => (
                      <td {...cell.getCellProps()} className={`px-2 py-4 whitespace-nowrap ${cellIndex === 0 ? 'text-left' : 'text-center'}`}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between p-2">
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="cursor-pointer rounded-l-lg bg-primary px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
          >
            {'<<'}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="cursor-pointer rounded-none bg-primary px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
          >
            {'<'}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="cursor-pointer rounded-none bg-primary px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
          >
            {'>'}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="cursor-pointer rounded-r-lg bg-primary px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
          >
            {'>>'}
          </button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Editar Cliente</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <CiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Nombre"
                  value={selectedCustomer?.client || ''}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, client: e.target.value })}
                  fullWidth
                />
                <Input
                  endContent={
                    <CiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  value={selectedCustomer?.email || ''}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, email: e.target.value })}
                  fullWidth
                />
                <Input
                  endContent={
                    <CiMobile3 className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Teléfono"
                  value={selectedCustomer?.phone || ''}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, phone: e.target.value })}
                  fullWidth
                />
                <Input
                  endContent={
                    <CiMap className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Provincia"
                  value={selectedCustomer?.state || ''}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, state: e.target.value })}
                  fullWidth
                />
                <Input
                  endContent={
                    <CiMap className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Cuidad"
                  value={selectedCustomer?.locality || ''}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, locality: e.target.value })}
                  fullWidth
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleUpdateCustomer}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Customers;
