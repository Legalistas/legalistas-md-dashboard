import { useEffect, useMemo, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useSortBy,
  usePagination,
} from "react-table";
import { FilterProps } from "react-table";
import ColumnFilter from "./ColumnFilter";
import SelectColumnFilter from "./Filters/SelectColumnFilter";
import DateColumnFilter from "./Filters/DateColumnFilter";
import ParticipantFilter from "./Filters/ParticipantFilter";
import { getShortDate } from "@/utils/date";
import { states } from "@/utils/helpers";
import { Avatar, AvatarGroup, Tooltip } from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "@nextui-org/shared-icons";

const KanbanList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.legalistas.com.ar/v1/crm/opportunity",
        );
        const leads = await response.json();

        const transformedData = leads.map((lead) => ({
          id: lead.id,
          date: getShortDate(lead.created_at),
          customer: `${lead.customer.profile.lastname} ${lead.customer.profile.firstname}`,
          email: lead.customer.email,
          phone: `${lead.customer.profile.characteristic + lead.customer.profile.phone}`,
          staff: {
            seller: lead.seller
              ? {
                  name: `${lead.seller.profile.lastname} ${lead.seller.profile.firstname}`,
                  avatar: lead.seller.profile.avatar,
                }
              : null,
            internalLawyer: lead.internalLawyer
              ? {
                  name: `${lead.internalLawyer.profile.lastname} ${lead.internalLawyer.profile.firstname}`,
                  avatar: lead.internalLawyer.profile.avatar,
                }
              : null,
            externalLawyer: lead.externalLawyer
              ? {
                  name: `${lead.externalLawyer.profile.lastname} ${lead.externalLawyer.profile.firstname}`,
                  avatar: lead.externalLawyer.profile.avatar,
                }
              : null,
          },
          state: states[lead.state],
          category: lead.category.name,
        }));

        setData(transformedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const sortees = useMemo(
    () => [
      {
        id: "id",
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

  const columns = useMemo(
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
        canFilter: true,
      },
      {
        Header: "Fecha",
        accessor: (row) => row.date.charAt(0).toUpperCase() + row.date.slice(1),
        Filter: DateColumnFilter,
        canFilter: true,
      },
      {
        Header: "Cliente",
        accessor: "customer",
        canFilter: true,
      },
      {
        Header: "Correo electrónico",
        accessor: "email",
        canFilter: true,
      },
      {
        Header: "Teléfono",
        accessor: "phone",
        canFilter: false,
      },
      {
        Header: "Participantes",
        accessor: "staff",
        canFilter: true,
        Cell: ({ row }) => (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "center",
            }}
          >
            <AvatarGroup isBordered className="cursor-pointer">
              <Tooltip content={row.original.staff.seller.name}>
                {row.original.staff.seller ? (
                  <Avatar
                    size="sm"
                    name={`${row.original.staff.seller.name}`}
                    src={row.original.staff.seller.avatar}
                  />
                ) : null}
              </Tooltip>
              <Tooltip content={row.original.staff.internalLawyer.name}>
                {row.original.staff.internalLawyer ? (
                  <Avatar
                    size="sm"
                    name={`${row.original.staff.internalLawyer.name}`}
                    src={row.original.staff.internalLawyer.avatar}
                  />
                ) : null}
              </Tooltip>
              <Tooltip content={row.original.staff.externalLawyer.name}>
                {row.original.staff.externalLawyer ? (
                  <Avatar
                    size="sm"
                    name={`${row.original.staff.externalLawyer.name}`}
                    src={row.original.staff.externalLawyer.avatar}
                  />
                ) : null}
              </Tooltip>
            </AvatarGroup>
          </div>
        ),
      },
      {
        Header: "Estado",
        accessor: "state",
        Filter: SelectColumnFilter,
        canFilter: true,
      },
      {
        Header: "Etapa",
        accessor: "category",
        Filter: SelectColumnFilter,
        canFilter: true,
      },
      {
        Header: "Acciones",
        accessor: "actions",
        canFilter: false,
        Cell: ({ row }) => {
          return (
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
          );
        },
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
      defaultColumn,
      initialState: {
        sortBy: sortees,
      },
    },
    useFilters,
    useGlobalFilter, // Hook de filtrado global
    useSortBy,
    usePagination, // Hook de paginación
  );

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <div className="w-full rounded-lg border border-stroke bg-white pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
        <div className="w-full overflow-x-auto">
          {isLoading ? (
            <div className="py-4 text-center">Cargando datos...</div>
          ) : (
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
                            <div className="flex items-center justify-between space-x-2">
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
                            <div>
                              {column.canFilter
                                ? column.render("Filter")
                                : null}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody {...getTableBodyProps()}>
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
          )}
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

export default KanbanList;
