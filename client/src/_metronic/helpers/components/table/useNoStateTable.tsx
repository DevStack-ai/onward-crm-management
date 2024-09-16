import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BasicTableState } from "../../../../providers";

function useBasicTable(endpoint: string, state: BasicTableState) {
  const baseUrl = `${import.meta.env.VITE_API_URL}${endpoint}`;
  const [isLoading, setIsLoading] = useState(false);

  const [dataList, setDataList] = useState(state.dataList);
  const [total, setTotal] = useState(state.total);
  const [pages, setPages] = useState(state.pages);
  const [page, _setPage] = useState(state.page);
  const [filters, _setFilters] = useState(state.filters)
  const [itemsPerPage, _setItemsPerPage] = useState(state.itemsPerPage);

  const fetchData = useCallback(async () => {
    if (page < 0) return;
    setIsLoading(true);
    try {
      const params = {
        page,
        items: itemsPerPage,
        filters,
      };
      const query = await axios.post(`${baseUrl}`, { ...params });

      const response = query.data;
      setPages(response.pages);
      setDataList(response.rows);
      setTotal(response.count);
      
      setIsLoading(false);
    } catch (error) {
      console.log("Error", error);
      setIsLoading(false);
    }
  }, [itemsPerPage, page, filters]);

  const setItemsPerPage = (items: number) => {

    _setItemsPerPage(items);
  };
  const setPage = (page: number) => {

    _setPage(page);
  };
  const setFilters = (filters: object) => {
  
    _setFilters(filters);
  };
  useEffect(() => {
    fetchData()
  }, [itemsPerPage, page, filters])

 
  return {
    helpers: {
      filters,
      setFilters,

      isLoading,
      fetchData,
      pages,
      page,
      setPage,
      itemsPerPage,
      setItemsPerPage,
      total,
    },
    dataList,
  };
}

export { useBasicTable };
