import { useState, useEffect } from 'react';
import { API_BASE_URL, formatRequest } from '@/utils/request';
import { UserItemsType, UserItems } from '@/utils/types';

type UseUserItemsProps = {
  userName: string;
  itemsType: UserItemsType;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
};

const useUserItems = ({
  userName,
  itemsType,
  totalPages,
  currentPage,
  itemsPerPage,
}: UseUserItemsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [areAllItemsLoaded, setAreAllItemsLoaded] = useState(false);
  const [items, setItems] = useState<UserItems>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `${API_BASE_URL}/users/${userName}/${itemsType}?page=${currentPage}&per_page=${itemsPerPage}`,
    )
      .then(formatRequest)
      .then((fetchedItems: UserItems) => {
        setItems((prevItems: UserItems) => [...prevItems, ...fetchedItems]);
        setAreAllItemsLoaded(currentPage === totalPages);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage, userName, itemsType, itemsPerPage, totalPages]);

  const resetItems = () => setItems([]);
  const resetErrorMessage = () => setErrorMessage('');

  return {
    isLoading,
    areAllItemsLoaded,
    items,
    errorMessage,
    resetItems,
    resetErrorMessage,
  };
};

export default useUserItems;
