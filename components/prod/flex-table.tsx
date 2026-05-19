"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FlexTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pageNum?: number;
}

const FlexTable = <T,>({ data, columns, pageNum = 5 }: FlexTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageNum,
      },
    },
  });

  const currentPage = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsisStart = currentPage > 2;
    const showEllipsisEnd = currentPage < pageCount - 3;

    if (pageCount <= 7) {
      return Array.from({ length: pageCount }, (_, i) => i);
    }

    pages.push(0);

    if (showEllipsisStart) {
      pages.push("...");
      pages.push(currentPage - 1, currentPage, currentPage + 1);
    } else {
      pages.push(1, 2, 3);
    }

    if (showEllipsisEnd) {
      pages.push("...");
    } else if (currentPage < pageCount - 3) {
      pages.push(pageCount - 3, pageCount - 2);
    }

    if (currentPage >= pageCount - 3) {
      for (let i = Math.max(4, currentPage - 1); i < pageCount - 1; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
    }

    pages.push(pageCount - 1);

    return pages;
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  没有记录
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center gap-1 py-4">
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          size="sm"
          variant="outline"
        >
          上一页
        </Button>
        {getPageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <Button
              className="h-8 w-8 p-0"
              key={index}
              onClick={() => table.setPageIndex(page)}
              size="sm"
              variant={currentPage === page ? "default" : "outline"}
            >
              {page + 1}
            </Button>
          ) : (
            <span className="px-2" key={index}>
              {page}
            </span>
          ),
        )}
        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          size="sm"
          variant="outline"
        >
          下一页
        </Button>
      </div>
    </div>
  );
};

export default FlexTable;
