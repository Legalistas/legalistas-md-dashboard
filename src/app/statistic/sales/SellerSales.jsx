"use client"
import React, { useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import { getSellerDataByYear, getSellerDataByYearAndMonth } from '@/services/analitycsApi'; // Ajusta la ruta según sea necesario

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('year');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // JavaScript months are 0-based

  const columns = React.useMemo(() => [
    { Header: 'Vendedor', accessor: 'vendedor' },
    { Header: 'Ganadas', accessor: 'ventas_ganadas' },
    { Header: 'En proceso', accessor: 'en_tratamiento' },
    { Header: 'Perdidas', accessor: 'perdido' },
    { Header: 'Oportunidades Creadas', accessor: 'oportunidades_creadas' }
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
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 } // Set the initial page size
    },
    usePagination
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (period === 'month') {
          response = await getSellerDataByYearAndMonth(year, 1);
        } else {
          response = await getSellerDataByYear(year);
        }
        // Extraer solo los datos necesarios y combinar nombres completos de los vendedores
        const extractedData = response.map(item => {
          const { seller, ...rest } = item;
          const fullName = seller ? `${seller.profile.firstname} ${seller.profile.lastname}` : null;
          return {
            ...rest,
            vendedor: fullName,
          };
        });
        setData(extractedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [period, year, month], []);

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark max-w-full'>
      <div className="container max-w-full">
        <div className="mb-3 justify-between gap-4 sm:flex max-w-full">
          <div>
            <h5 className="text-xl font-semibold text-black dark:text-white">
              Visitors Analytics
            </h5>
          </div>
          <div>
            <div className="relative z-20 inline-block">
              <select
                name="period"
                id="period"
                value={period}
                onChange={handlePeriodChange}
                className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
              >
                <option value="month" className="dark:bg-boxdark">
                  Mensual
                </option>
                <option value="year" className="dark:bg-boxdark">
                  Anual
                </option>
              </select>
              <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                    fill="#637381"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                    fill="#637381"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
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
                    )
                    )}
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
    </div>
  );
};

export default TableComponent;
