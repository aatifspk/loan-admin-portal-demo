import React, { useState, useMemo, useEffect, useCallback } from "react";
import { advancedTable } from "../../constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import branchService from "@/services/branch-service";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { setBranches } from "@/store/api/branch/branchSlice";
import debounceFunction from "../../helper/Debounce";

import { tr } from "@faker-js/faker";


const COLUMNS = [
  {
    Header: "Name",
    accessor: "id",
    Cell: (cell) => {
      return <span>{cell.row.original.branchName}</span>;
    },
  },
  {
    Header: "city",
    accessor: "city",
    Cell: (cell) => {
      return <span>{cell.row.original.city}</span>;
    },
  },
  {
    Header: "state",
    accessor: "state",
    Cell: (cell) => {
      return <span>{cell.row.original.state}</span>;
    },
  },
  {
    Header: "status",
    accessor: "status",
    Cell: (cell) => {
      return (
        <span className="block w-full">
          <span
            className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${cell.row.original.status === true
              ? "text-success-500 bg-success-500"
              : ""
              } 
            ${cell.row.original.status == false
                ? "text-warning-500 bg-warning-500"
                : ""
              }
             `}
          >
            {cell.row.original.status ? "Active" : "InActive"}
          </span>
        </span>
      );
    },
  },
  {
    Header: "action",
    accessor: "action",
    Cell: (row) => {
      return (
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Tooltip content="View" placement="top" arrow animation="shift-away">
            <button className="action-btn" type="button">
              <Icon icon="heroicons:eye" />
            </button>
          </Tooltip>
          <Tooltip content="Edit" placement="top" arrow animation="shift-away">
            <button className="action-btn" type="button">
              <Icon icon="heroicons:pencil-square" />
            </button>
          </Tooltip>
          <Tooltip
            content="Delete"
            placement="top"
            arrow
            animation="shift-away"
            theme="danger"
          >
            <button className="action-btn" type="button">
              <Icon icon="heroicons:trash" />
            </button>
          </Tooltip>
        </div>
      );
    },
  },
];

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          type="checkbox"
          ref={resolvedRef}
          {...rest}
          className="table-checkbox"
        />
      </>
    );
  }
);

const Branch = ({ title = "Branch List" }) => {
  const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => advancedTable, []);


  const dispatch = useDispatch()


  const store = useSelector((state) => state);
  const { branches: branchList, totalbranchesCount: count } = useSelector((state) => state.branches);

  console.log("store 333", store);


  const [data, setData] = useState([{},{},{},{},{},{},{},{},{},{},{},{}]);

  const [perPage, setPerPage] = useState(10);
  const [multiplePage, setMultiplePage] = useState([1])
  const [currentPage, setCurrentPage] = useState(1);
  const [canGoNextPage, setCanGoNextPage] = useState(false);
  const [canGoPreviousPage, setCanGoPreviousPage] = useState(false);



  const [filterText, setFilterText] = useState("");

  useEffect(() => {

    async function getBranches() {

      try {
        const response = await branchService.getUnDeletedBranchsList(
          filterText,
          currentPage,
          perPage,
          true,
          true
        );

        dispatch(setBranches({ rows: response.data.listBranches, count: response.data.count }))

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getBranches()

  }, [])

  useEffect(() => {

    console.log("length", branchList.length);

    setData(branchList);
    const totalCount = count;
    const calculatedPageCount = Math.ceil(totalCount / perPage);
    if (calculatedPageCount > 1) {
      setCanGoNextPage(true);
    }
    const arrayPage = Array.from({ length: calculatedPageCount }, (_, i) => i + 1);
    setMultiplePage(arrayPage)

  }, [branchList]);


  // my page hadler

  async function goToNextPage(pageNumber) {

    try {

      const response = await branchService.getUnDeletedBranchsList(
        filterText,
        pageNumber + 1,
        perPage,
        true,
        true
      );
      dispatch(setBranches({ rows: response.data.listBranches, count: response.data.count }))

    } catch (error) {
      console.error("Error while fetching branches:", error);
    }

  }


  // my row Per page handler

  const handlePerRowsChange = async (newPerPage) => {

    try {

      const response = await branchService.getUnDeletedBranchsList(
        filterText,
        currentPage,
        newPerPage,
        true,
        true
      );


      dispatch(setBranches({ rows: response.data.listBranches, count: response.data.count }))
      setPerPage(Number(newPerPage))

    } catch (error) {
      console.error("Error while fetching branches:", error);
    }

  };


  // new useEffect
  // useEffect(() => {
  //   async function getBranches() {
  //     try {
  //       const response = await branchService.getUnDeletedBranchsList(
  //         filterText,
  //         currentPage,
  //         perPage,
  //         true,
  //         true
  //       );

  //       console.log("response", response);
  //       // Update the data with the fetched data
  //       setData(response.data.listBranches);
  //       // Calculate pageCount based on the count from API
  //       const totalCount = response.data.count;
  //       const calculatedPageCount = Math.ceil(totalCount / perPage);
  //       if(calculatedPageCount > 1){

  //         setCanGoNextPage(true)

  //       }

  //       const arrayPage =  Array.from({ length: calculatedPageCount }, (_, i) => i + 1);
  //       setMultiplePage(arrayPage)

  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }

  //   getBranches();

  // }, [filterText, currentPage, perPage]);


  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,

    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;



  // debounce search
  const debounceSearch = useCallback(
    debounceFunction(
      async (nextValue) => {
        try {
          const response = await branchService.getUnDeletedBranchsList(
            nextValue,
            currentPage,
            perPage,
            true,
            true
          );

          dispatch(
            setBranches({
              rows: response.data.listBranches,
              count: response.data.count,
            })
          );
        } catch (error) {
          console.error("Error while fetching branches:", error);
        }
      },
      1000
    ),
    []
  );





  return (
    <>
      <Card>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">{title}</h4>
          <div>
            <GlobalFilter filterText={filterText} onFilter={(event) => {
              console.log("text", event.target.value);
              setFilterText(event.target.value);
              debounceSearch(event.target.value);
            }} />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className="bg-slate-200 dark:bg-slate-700">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className=" table-th "
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page && page.length > 0 ? page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()} className="table-td">
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  }) : [0].map((item) => {

                    return (
                      <tr className="text-center">
                        <td></td>
                        <td style={{height:"10em"}} colSpan={ '4'}>No Data Found !</td>
                      </tr>
                    )

                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <select
              className="form-control py-2 w-max"
              value={perPage}
              onChange={(e) => {
                handlePerRowsChange(e.target.value)
                setPerPage(Number(e.target.value))
                setPageSize(Number(e.target.value))
              }}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {currentPage} of {multiplePage.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons:chevron-double-left-solid" />
              </button>
            </li>
            <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Prev
              </button>
            </li>
            {multiplePage.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${pageIdx == pageIndex
                    ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                    : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                    }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => goToNextPage(pageIdx)}
                >
                  {page}
                </button>
              </li>
            ))}
            <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${!canGoNextPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={() => {
                  console.log("hhh", pageCount);
                  nextPage()
                } }
                disabled={!canGoNextPage}
              >
                Next
              </button>
            </li>
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                onClick={() =>{
                  

                  gotoPage(pageCount - 1)
                } }
                disabled={!canNextPage}
                className={` ${!canGoNextPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                <Icon icon="heroicons:chevron-double-right-solid" />
              </button>
            </li>
          </ul>
        </div>
        {/*end*/}
      </Card>
    </>
  );
};

export default Branch;
