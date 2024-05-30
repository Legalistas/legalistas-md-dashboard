"use client";

import React, { useEffect, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { md5 } from "@/types/utils";
import { Button, Tooltip } from "@nextui-org/react";
import SearchInput from "./Component/SearchInput";
import { PlusIcon } from "../Icons/PlusIcon";
import { EyeIcon } from "../Icons/EyeIcon";
import { EditIcon } from "../Icons/EditIcon";
import { DeleteIcon } from "../Icons/DeleteIcon";
import Link from "next/link";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.legalistas.com.ar/v1/user");
        const users = await response.json();

        const transformedData = users.map((user) => ({
          id: user.id,
          lastnameFirstname: `${user.profile.lastname} ${user.profile.firstname}`,
          email: user.email,
          role: user?.teamRole?.role?.name || "Sin Equipo y Rol",
          team: user?.teamRole?.team?.name || "Sin Equipo y Rol",
          status: user.status ? "active" : "paused",
          avatar: `https://secure.gravatar.com/avatar/${md5(user.email)}?size=150px`,
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const sortees = React.useMemo(
    () => [
      {
        id: "lastnameFirstname",
        desc: false,
      },
    ],
    [],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            ID
          </div>
        ),
        accessor: "id",
      },
      {
        Header: "Apellido & Nombre",
        accessor: "lastnameFirstname",
        Cell: ({ row }) => (
          <div className="flex items-center">
            <img
              src={row.original.avatar}
              alt="Avatar"
              className="mr-2 h-8 w-8 rounded-full"
            />
            <div>
              <div className="text-bold capitalize">
                {row.original.lastnameFirstname}
              </div>
              <div className="text-bold text-small text-default-500">
                {row.original.email}
              </div>
            </div>
          </div>
        ),
      },
      {
        Header: "Rol",
        accessor: "role",
      },
      {
        Header: "Area",
        accessor: "team",
      },
      {
        Header: "Estado",
        accessor: "status",
      },
      {
        Header: "Acción",
        accessor: "actions",
        disableSortBy: true,
        Cell: ({ row }) => (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Ver información">
              <button
                onClick={() => handleAction(row.original.id, "details")}
                className="cursor-pointer text-lg text-default-400 active:opacity-50"
              >
                <EyeIcon />
              </button>
            </Tooltip>
            <Tooltip content="Editar usuario">
              <button
                onClick={() => handleAction(row.original.id, "edit")}
                className="cursor-pointer text-lg text-default-400 active:opacity-50"
              >
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Borrar miembro">
              <button
                onClick={() => handleAction(row.original.id, "delete")}
                className="cursor-pointer text-lg text-danger active:opacity-50"
              >
                <DeleteIcon />
              </button>
            </Tooltip>
          </div>
          // Puedes agregar más botones o elementos aquí según tus necesidades
        ),
      },
    ],
    [],
  );

  const handleAction = (id, action) => {
    console.log(`${action} action for user ID: ${id}`);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Usar page en lugar de rows para paginación
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    pageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: sortees,
      },
    },
    useGlobalFilter, // Hook de filtrado global
    useSortBy,
    usePagination, // Hook de paginación
  );

  const { globalFilter, pageIndex } = state;

  const handleGlobalFilterChange = (value) => {
    setIsLoading(true);
    setGlobalFilter(value);
    // Simular un retardo para la carga (por ejemplo, una solicitud de red)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Ajusta el tiempo de espera según tus necesidades
  };

  return (
    <div className="rounded-lg border border-stroke bg-white pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
      <div className="flex items-center justify-between rounded p-2.5">
        <SearchInput
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          isLoading={isLoading}
        />

        <div className="flex w-1/2 items-center justify-end gap-2">
          <Link href="/users/create">
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

      <div className="max-w-full overflow-x-auto">
        <table {...getTableProps({ className: "w-full table-auto " })}>
          <thead>
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderGroupProps } =
                headerGroup.getHeaderGroupProps({
                  className: "bg-gray-2 text-left dark:bg-meta-4",
                });
              return (
                <tr key={key} {...restHeaderGroupProps}>
                  {headerGroup.headers.map((column) => {
                    const { key, ...restColumn } = column.getHeaderProps(
                      column.getSortByToggleProps({
                        className: `w-auto px-4 py-4 font-medium text-black dark:text-white cursor-pointer ${column.id !== "actions" ? "" : "cursor-pointer"}`,
                      }),
                    );
                    return (
                      <th key={key} {...restColumn}>
                        <div className=" flex items-center justify-between space-x-2">
                          <span>{column.render("Header")}</span>
                          <span>
                            {column.id !== "actions" &&
                              (column.isSorted ? (
                                column.isSortedDesc ? (
                                  <FaSortDown className="text-[#718096] dark:text-[#718096]" />
                                ) : (
                                  <FaSortUp className="text-[#718096] dark:text-[#718096]" />
                                )
                              ) : (
                                <FaSort className="text-[#718096] dark:text-[#718096]" />
                              ))}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps}>
            {page.map((row) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              return (
                <tr key={key} {...restRowProps}>
                  {row.cells.map((cell) => {
                    const { key, ...restCellProps } = cell.getCellProps({
                      className:
                        "border-b border-[#eee] px-4 py-5 dark:border-strokedark",
                    });
                    return (
                      <td key={key} {...restCellProps}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between p-2">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>

        <div className="flex items-center">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="cursor-pointer rounded-l-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="cursor-pointer rounded-none bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {"<"}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="cursor-pointer rounded-none bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="cursor-pointer rounded-r-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
