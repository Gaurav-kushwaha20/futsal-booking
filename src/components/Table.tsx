import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    type ColumnDef,
    type RowSelectionState,
} from '@tanstack/react-table';
import React, { useEffect, useRef } from 'react';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { MdArrowDropDown } from 'react-icons/md';

interface TableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    rowSelection?: RowSelectionState;
    setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>;
    onSelectedRowsChange?: (rows: T[]) => void;
    totalItem?: number;
    totalPage?: number;
    pages?: {
        page: number;
        setPage: React.Dispatch<React.SetStateAction<number>>;
        pageSize: number;
        setPageSize: React.Dispatch<React.SetStateAction<number>>;
    };
    maxHeight?: string;
}

const pageSizeOptions = [10, 20, 30, 50];

const Table = <T,>({
    data,
    columns,
    rowSelection = {},
    setRowSelection,
    pages,
    totalItem = 0,
    totalPage = 1,
    onSelectedRowsChange,
}: TableProps<T>) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: totalPage,
        state: {
            rowSelection,
            pagination: {
                pageIndex: pages?.page || 0,
                pageSize: pages?.pageSize || pageSizeOptions[0],
            },
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: updater => {
            if (!pages) return;
            const newPagination =
                typeof updater === 'function'
                    ? updater({ pageIndex: pages.page, pageSize: pages.pageSize })
                    : updater;
            pages.setPage(newPagination.pageIndex);
            if (newPagination.pageSize !== pages.pageSize) {
                pages.setPage(1);
                pages.setPageSize(newPagination.pageSize);
            }
        },
        getPaginationRowModel: getPaginationRowModel(),
    });

    useEffect(() => {
        if (onSelectedRowsChange) {
            const selectedData = table?.getSelectedRowModel()?.rows?.map(row => row?.original);
            onSelectedRowsChange(selectedData);
        }
    }, [rowSelection, table, onSelectedRowsChange]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            const deltaX = Math.abs(e.deltaX);
            const deltaY = Math.abs(e.deltaY);

            if (deltaX > deltaY) {
                // Block vertical scrolling
                e.preventDefault();
                el.scrollLeft += e.deltaX;
            } else {
                // Block horizontal scrolling
                e.preventDefault();
                el.scrollTop += e.deltaY;
            }
        };

        el.addEventListener('wheel', onWheel, { passive: false });

        return () => {
            el.removeEventListener('wheel', onWheel);
        };
    }, []);

    const currentPage = pages?.page || 0;
    const currentPageSize = pages?.pageSize || pageSizeOptions[0];
    const startItem = (currentPage - 1) * currentPageSize + 1;

    const canPreviousPage = currentPage > 1;
    const canNextPage = currentPage < (totalPage || 1);

    return (
        <div className="w-full h-full flex flex-col">
            {/* table starts */}
            <div
                ref={containerRef}
                className="flex-1 overflow-auto rounded-[8px] border-[0.5px] border-primary-100"
            >
                <table className="w-full border-collapse table-fixed">
                    <thead className="bg-white sticky top-0">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="w-full">
                                {headerGroup.headers.map(header => {
                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            style={{
                                                width: `${header.getSize()}px`,
                                                maxWidth: header.column.columnDef.maxSize
                                                    ? `${header.column.columnDef.maxSize}px`
                                                    : undefined,
                                                minWidth: header.column.columnDef.minSize
                                                    ? `${header.column.columnDef.minSize}px`
                                                    : undefined,
                                            }}
                                            className="px-4 py-2.5 text-start typography-semi-bold-extra-small text-[#353535] border-b-[0.5px] border-r-[0.5px] border-b-primary-100 border-r-primary-100"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>

                    <tbody className="min-w-full">
                        {table?.getRowModel()?.rows?.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={table?.getAllColumns()?.length}
                                    className="text-center py-6 text-sm text-gray-500 font-medium"
                                >
                                    No data to show
                                </td>
                            </tr>
                        ) : (
                            table?.getRowModel()?.rows?.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={`w-full ${rowSelection && row?.getIsSelected() ? 'bg-primary-200' : ''
                                        } ${index % 2 == 0 ? 'bg-primary-50' : ''}`}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            className="px-4 py-2.5 text-gray-600 font-sans text-[0.750rem] tracking-[0.36px] font-normal border-b-[0.5px] border-r-[0.5px] border-b-primary-100 border-r-primary-100 whitespace-normal break-words"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {pages && (
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <p className="typography-regular-small text-caption">Rows per page:</p>
                        <div className="relative">
                            <select
                                className="appearance-none p-1 pr-8 rounded border border-gray-300 typography-regular-small text-caption bg-white cursor-pointer"
                                value={currentPageSize}
                                onChange={e => {
                                    const newSize = Number(e.target.value);
                                    pages.setPageSize(newSize);
                                    pages.setPage(1);
                                }}
                            >
                                {[pages?.pageSize, ...pageSizeOptions].map((size, index) => (
                                    <option key={index} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                <MdArrowDropDown />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="typography-regular-small text-caption">
                            {startItem} of {totalItem}
                        </span>

                        <div className="flex items-center gap-2">
                            <button
                                className={`p-2 rounded ${canPreviousPage ? 'hover:bg-gray-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                                onClick={() => canPreviousPage && pages.setPage(currentPage - 1)}
                                disabled={!canPreviousPage}
                            >
                                <FcPrevious />
                            </button>

                            <button
                                className={`p-2 rounded ${canNextPage ? 'hover:bg-gray-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                                onClick={() => canNextPage && pages.setPage(currentPage + 1)}
                                disabled={!canNextPage}
                            >
                                <FcNext />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
