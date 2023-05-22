import { useState, useEffect } from 'react';
import { useErrorMessage } from '@/contexts/ErrorMessageContext';
import { API_BASE_URL, formatRequest } from '@/utils/request';
import { UserItemsType, UserItems } from '@/utils/types';

type UseUserItemsParams = {
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
}: UseUserItemsParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldDisplayItems, setShouldDisplayItems] = useState(false);
  const [areAllItemsLoaded, setAreAllItemsLoaded] = useState(false);
  const [items, setItems] = useState<UserItems>([]);

  const { displayErrorMessage, updateErrorMessage } = useErrorMessage();

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `${API_BASE_URL}/users/${userName}/${itemsType}?page=${currentPage}&per_page=${itemsPerPage}`,
    )
      .then(formatRequest)
      .then((fetchedItems: UserItems) => {
        setShouldDisplayItems(true);
        setItems((prevItems: UserItems) => [...prevItems, ...fetchedItems]);
        setAreAllItemsLoaded(currentPage === totalPages);
      })
      .catch((error) => {
        displayErrorMessage();
        updateErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    currentPage,
    userName,
    itemsType,
    itemsPerPage,
    totalPages,
    displayErrorMessage,
    updateErrorMessage,
  ]);

  const resetItems = () => {
    setShouldDisplayItems(false);
    setItems([]);
  };

  return {
    isLoading,
    shouldDisplayItems,
    areAllItemsLoaded,
    items,
    resetItems,
  };
};

export default useUserItems;
