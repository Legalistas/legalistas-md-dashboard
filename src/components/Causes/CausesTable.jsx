"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useSortBy,
  usePagination,
} from "react-table";
import { useAuth } from "@/contexts/AuthContext";
import ColumnFilter from "@/components/Crm/ColumnFilter";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa6";
import { Avatar, AvatarGroup, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { EyeIcon, DeleteIcon } from "@nextui-org/shared-icons";

const CausesTable = () => {
  const { user } = useAuth();
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.legalistas.com.ar/v1/causes");
        const data = await response.json();

        const teamIdsWithFullAccess = [1, 2, 3, 4, 5, 6, 7];
        const restrictedRoleId = 5;

        console.log(
          "TEAM AND ROLE: ",
          user.user.teamRole.team_id,
          user.user.teamRole.role_id,
        );
        console.log("Data received from API: ", data);

        let filteredCauses;

        if (
          teamIdsWithFullAccess.includes(user.user.teamRole.team_id) &&
          user.user.teamRole.role_id !== restrictedRoleId
        ) {
          console.log("User has full access based on team ID");
          filteredCauses = data;
        } else if (user.user.teamRole.role_id === restrictedRoleId) {
          console.log("User has restricted access based on role ID");
          filteredCauses = data.filter(
            (cause) => cause.external_lawyer_id === user.user.id,
          );
        } else {
          console.log(
            "User has no special access rights, apply default filtering",
          );
          filteredCauses = data;
        }

        console.log("Filtered causes: ", filteredCauses);
        setCauses(filteredCauses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: () => <div className="w-full text-center">ID</div>,
        accessor: "internal_number",
        canFilter: true,
      },
      {
        Header: "Caratula",
        accessor: "caratula", // Define un accessor aquí
        canFilter: true,
        Cell: ({ row }) => (
          <div className="uppercase">
            {`${row.original.customer.profile.lastname} ${row.original.customer.profile.firstname}`}
            <span className="font-medium">{` C/ S/ ${row.original.process_type.name}`}</span>
          </div>
        ),
        Filter: ColumnFilter, // Asegúrate de que el filtro esté definido
      },
      {
        Header: "Nº Expediente",
        accessor: "cuij",
        canFilter: true,
      },
      {
        Header: "Representantes",
        Cell: ({ row }) => (
          <>
            <AvatarGroup isBordered className="cursor-pointer">
              <Tooltip
                content={`${row.original.internal_lawyer.profile.lastname} ${row.original.internal_lawyer.profile.firstname}`}
              >
                {row.original.internal_lawyer ? (
                  <Avatar
                    size="sm"
                    name={`${row.original.internal_lawyer.profile.lastname} ${row.original.internal_lawyer.profile.firstname}`}
                    src={row.original.internal_lawyer.profile.avatar}
                  />
                ) : null}
              </Tooltip>
              <Tooltip
                content={`${row.original.external_lawyer.profile.lastname} ${row.original.external_lawyer.profile.firstname}`}
              >
                {row.original.external_lawyer ? (
                  <Avatar
                    size="sm"
                    name={`${row.original.external_lawyer.profile.lastname} ${row.original.external_lawyer.profile.firstname}`}
                    src={row.original.external_lawyer.profile.avatar}
                  />
                ) : null}
              </Tooltip>
            </AvatarGroup>
          </>
        ),
      },
      {
        Header: "Juzgado",
        accessor: "court.jurisdictionCompetences.name",
      },
      {
        Header: "Etapa Procesal",
        accessor: "procedural_stage.name",
      },
      {
        Header: "Fecha de Creación",
        accessor: "start_date",
        Cell: ({ row }) => (
          <div>{new Date(row.original.start_date).toLocaleDateString()}</div>
        ),
      },
      {
        Header: "Acciones",
        Cell: ({ row }) => (
          <div className="flex justify-center">
            <Link
              href={`/causes/${row.original.id}`}
              className="mr-2 text-primary hover:text-gray-4-500 hover:underline"
            >
              <EyeIcon className="h-5 w-5" />
            </Link>
            <Link
              href={`/causes/${row.original.id}`}
              className="text-danger hover:text-danger-500 hover:underline"
            >
              <DeleteIcon className="h-5 w-5" />
            </Link>
          </div>
        ),
      },
    ],
    [],
  );

  const sortees = useMemo(
    () => [
      {
        id: "internal_number",
        desc: true,
      },
    ],
    [],
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
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
      data: causes,
      defaultColumn,
      initialState: {
        sortBy: sortees,
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <div className="rounded-lg border border-stroke bg-white pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
        <div className="max-full overflow-x-auto rounded-lg">
          <table {...getTableProps({ className: "w-full table-auto text-sm" })}>
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
                          <div className="flex items-center justify-between space-x-2">
                            <span>{column.render("Header")}</span>
                            {column.isSorted ? (
                              <span>
                                {column.isSortedDesc ? (
                                  <FaSortDown className="text-[#718096] dark:text-[#718096]" />
                                ) : (
                                  <FaSortUp className="text-[#718096] dark:text-[#718096]" />
                                )}
                              </span>
                            ) : (
                              <span>
                                <FaSort className="text-[#718096] dark:text-[#718096]" />
                              </span>
                            )}
                          </div>
                          <div>
                            {column.canFilter ? column.render("Filter") : null}
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
                          "border-b border-[#eee] px-4 py-2.5 text-[#4A5568] text-left dark:border-strokedark",
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
    </>
  );
};

export default CausesTable;
