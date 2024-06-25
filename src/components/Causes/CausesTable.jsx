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
import DateColumnFilter from "../Crm/Filters/DateColumnFilter";
import SelectComponent from "@/components/Form/SelectComponent";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa6";
import {
  Avatar,
  AvatarGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
  SelectSection,
  Tooltip,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import { EyeIcon, DeleteIcon } from "@nextui-org/shared-icons";

const CausesTable = () => {
  const { user } = useAuth();
  const [causes, setCauses] = useState([]);
  const [proceduralStage, setProceduralStage] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.legalistas.com.ar/v1/causes");
        const data = await response.json();
        console.log("🚀 ~ data:", data);

        const teamIdsWithFullAccess = [1, 2, 3, 4, 5, 6, 7];
        const restrictedRoleId = 5;

        let filteredCauses;

        if (
          teamIdsWithFullAccess.includes(user.user.teamRole.team_id) &&
          user.user.teamRole.role_id !== restrictedRoleId
        ) {
          filteredCauses = data;
        } else if (user.user.teamRole.role_id === restrictedRoleId) {
          filteredCauses = data.filter(
            (cause) => cause.external_lawyer_id === user.user.id,
          );
        } else {
          filteredCauses = data;
        }
        setCauses(filteredCauses);
        // Settings
        const settings = await fetch(
          "https://api.legalistas.com.ar/v1/settings",
        );
        const psData = await settings.json();
        setProceduralStage(psData.proceduralStages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    console.log("🚀 ~ handleSelectChange ~ name, value:", name, value);

    // Ensure name is correctly read from the select element
    if (!name) {
      console.error("Name attribute is missing in the event target");
      return;
    }

    setUserData((prevUserData) => {
      const newUserData = { ...prevUserData, [name]: value };
      console.log("Updated userData:", newUserData);
      return newUserData;
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: () => <div className="w-full text-center">ID</div>,
        accessor: "internal_number",
        Cell: ({ row }) => (
          <div className="text-center">{row.original.internal_number}</div>
        ),
        canFilter: true,
      },
      {
        Header: "Caratula",
        accessor: "caratula", // Define un accessor aquí
        canFilter: true,
        Cell: ({ row }) => {
          const customerProfile = row.original.customer?.profile;
          const processType = row.original.process_type?.name;

          // Buscar el litigante que sea demandado
          const demandadoLitigant = row.original.litigants.find(
            (litigant) => litigant.role === "Demandado",
          );
          const litigantsProfile = demandadoLitigant?.customer?.profile;

          return (
            <div className="uppercase">
              {customerProfile
                ? `${customerProfile.lastname} ${customerProfile.firstname}`
                : "No profile data"}
              <span className="font-medium">
                {litigantsProfile
                  ? ` C/${litigantsProfile.lastname} ${litigantsProfile.firstname}`
                  : ""}
                {processType ? ` S/${processType}` : ""}
              </span>
            </div>
          );
        },
        Filter: ColumnFilter, // Asegúrate de que el filtro esté definido
      },
      {
        Header: "Nº Expediente",
        accessor: "cuij",
        Cell: ({ row }) => (
          <div className="text-center">{row.original.cuij}</div>
        ),
        canFilter: true,
      },
      {
        Header: "Representantes",
        Cell: ({ row }) => (
          <>
            <Dropdown placement="start" className="cursor-pointer">
              <DropdownTrigger>
                {row.original.external_lawyer
                  ? `${row.original.external_lawyer.profile.lastname} ${row.original.external_lawyer.profile.firstname}`
                  : null}
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">@tonyreichert</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ),
        Filter: ColumnFilter,
      },
      {
        Header: "Interno",
        Cell: ({ row }) => (
          <>
            <Dropdown placement="start" className={"cursor-pointer"}>
              <DropdownTrigger>
                {row.original.internal_lawyer
                  ? `${row.original.internal_lawyer.profile.lastname} ${row.original.internal_lawyer.profile.firstname}`
                  : null}
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">@tonyreichert</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ),
        Filter: ColumnFilter,
      },
      {
        Header: "Juzgado",
        accessor: "court.jurisdictionCompetences.name",
      },
      {
        Header: "Etapa Procesal",
        accessor: "procedural_stage.name",
        Cell: ({ row }) => (
          <div className="text-center">
            <SelectComponent
              name="proceduralstage"
              value={row.original.procedural_stage_id}
              onChange={handleSelectChange}
              options={proceduralStage}
            />
          </div>
        ),
      },
      {
        Header: "Fecha de Creación",
        accessor: "start_date",
        Filter: DateColumnFilter,
        Cell: ({ row }) => (
          <div className="text-center">
            {new Date(row.original.start_date).toLocaleDateString()}
          </div>
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
                          {/* <div>
                            {column.canFilter ? (
                              column.render("Filter")
                            ) : (
                              <div className="mt-2"></div>
                            )}
                          </div> */}
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
