import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    usePagination,
    useRowSelect,
} from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown,faArrowUp,faArrowRotateBack,faArrowRotateForward } from "@fortawesome/free-solid-svg-icons";


import "./table.css";
import { Action } from "../Gerer_Contrat/Gerer_Contrat";
//import Viewdata from "../viewdata/viewdata";
export default function Table(props) {
    const { datas, COLUMNS, handleDelete, handleEdite,setSelectedData,setView } = props;
    
   
    const [trow, setTrow] = useState();
    const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = React.useRef();
            const resolvedRef = ref || defaultRef;
            React.useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate;
            }, [resolvedRef, indeterminate]);
            return (
                <>
                    <input type="checkbox" ref={resolvedRef} {...rest} />
                </>
            );
        }
    );
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => datas, [datas]);

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
        setPageSize,
        selectedFlatRows,
    } = useTable(
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
                // Let's make a column for selection
                {
                    id: "selection",
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox
                                {...getToggleAllRowsSelectedProps()}
                            />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                {...row.getToggleRowSelectedProps()}
                            />
                        </div>
                    ),
                },
                ...columns,
            ]);
        }
    );
    const { globalFilter, pageIndex, pageSize, selectedRowIds } = state;

    return (
        <>
            <div className="searchDiv">
                {" "}
                Search:{" "}
                <input
                    className="searchTable"
                    type="search"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((header) => (
                        <tr {...header.getHeaderGroupProps()}>
                            {header.headers.map((colum) => (
                                <th
                                    {...colum.getHeaderProps(
                                        colum.getSortByToggleProps()
                                    )}
                                >
                                    {colum.render("Header")}
                                    {colum.isSorted ? (
                                        colum.isSortedDesc ? (
                                            <FontAwesomeIcon
                                        className="icon"
                                        icon={faArrowUp}
                                        
                                                />
                                        ) : (
                                            <FontAwesomeIcon
                                        className="icon"
                                        icon={faArrowDown}
                                        
                                                />
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </th>
                            ))}
                            { !props.action?<th
                                colSpan="1"
                                role="columnheader"
                                title="Toggle SortBy"
                                style={{ cursor: "pointer" }}
                            >
                                Action
                            </th>:
                            <></>}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                onClick={() => {
                                    // setViewdata(!viewData);
                                    setTrow(row.original);
                                }}
                            >
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            <div style={{maxWidth:"120px",heigth:"auto"}}>{cell.render("Cell")}</div>
                                        </td>
                                    );
                                })}
                              
                                { !props.action?<td>
                                <button className='action_btn view' onClick={()=>{setView(true);setSelectedData(row.original)}}>View</button> 
                                <button className='action_btn upd' onClick={()=>{handleEdite(true) ; setSelectedData(row.original);}}>update</button>
                                <button className='action_btn del' onClick={()=>{handleDelete(row.original.id) ; setSelectedData(row.original);}}>delete</button>
                                </td>:
                                <></>}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="tableFooter">
                <select
                    className="tableSelect"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                >
                    {[10, 25, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            show{pageSize}
                        </option>
                    ))}
                </select>
                <p className="tablepages">
                    Page{" "}
                    <strong>
                        {" "}
                        {pageIndex + 1} of {pageOptions.length}{" "}
                    </strong>{" "}
                </p>
                <button
                    id="a"
                    className="tablepagination "
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    {" "}
                    <FontAwesomeIcon icon={faArrowRotateBack}size="l"/>
                    Prevouis{" "}
                </button>
                <button
                    id="b"
                    className="tablepagination "
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                >
                    next <FontAwesomeIcon
                    icon={faArrowRotateForward}
                    size="l"
                    />
                </button>
            </div>
            {/* {viewData && <Viewdata setViewdata={setViewdata} data={trow} />} */}
        </>
    );
}