import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { NetworkError } from "@/utils/network";
import { BaseApiResponse, BaseMeta } from "@/types/api";
import toast from "react-hot-toast";

interface FetchParams {
  page: number;
  limit: number;
  search: string;
  sort: string;
}

interface UseTablePageOptions<T> {
  defaultOrderBy: string;
  fetchFn: (params: FetchParams) => Promise<{ data: BaseApiResponse<T[]> }>;
  deleteFn: (id: number) => Promise<{ data: any }>;
  deleteSuccessMessage: string;
}

const useTablePage = <T>({
  defaultOrderBy,
  fetchFn,
  deleteFn,
  deleteSuccessMessage,
}: UseTablePageOptions<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [meta, setMeta] = useState<BaseMeta>();

  // Sort
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  // Search
  const { control } = useForm({
    defaultValues: { search: "" },
  });

  const watchSearch = useWatch({ control, name: "search" });
  const [debounceSearch] = useDebounce(watchSearch, 1000);

  // Delete dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(0);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchFn({
        search: debounceSearch,
        page: page + 1,
        limit: rowsPerPage,
        sort: `${orderBy} ${order.toUpperCase()}`,
      });
      setData(response.data.data ?? []);
      setMeta(response.data.meta);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedId) return;

    try {
      await deleteFn(selectedId);
      setIsDeleteDialogOpen(false);
      toast.success(deleteSuccessMessage);
      fetchData();
    } catch (error) {
      const networkError = error as NetworkError<BaseApiResponse>;
      const errorMessage =
        networkError.response?.data?.error ||
        networkError.response?.data?.message ||
        "Silahkan coba lagi.";

      toast.error(errorMessage);
    }
  };

  const openDeleteDialog = (id: number) => {
    setSelectedId(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  useEffect(() => {
    setPage(0);
  }, [debounceSearch]);

  useEffect(() => {
    fetchData();
  }, [debounceSearch, rowsPerPage, page, orderBy, order]);

  return {
    // Data
    data,
    isLoading,
    meta,

    // Search
    control,

    // Pagination
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,

    // Sort
    order,
    orderBy,
    handleRequestSort,

    // Delete
    isDeleteDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    handleDeleteConfirm,

    // Refetch
    fetchData,
  };
};

export default useTablePage;
