import { useState, useEffect, useMemo, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '../molecules/Card';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { BASE_URL, handleErrors } from '../../utils/request';
import { SectionType, Items } from '../../utils/types';

const ITEMS_PER_PAGE = 10;

const Main = styled('main')({
  display: 'grid',
  gridGap: 20,
  paddingTop: 20,
  position: 'relative',
  '@media (min-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 420px)',
  },
});

const LoaderWrapper = styled('div')({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  minHeight: 150,
  width: '100%',
});

const EmptyMsg = styled('div')({
  display: 'flex',
  marginTop: 8,
});

type Props = {
  userName: string;
  sectionType: SectionType;
  totalItems: number;
  onRequestError: (errorMessage: string) => void;
};

const UserSection = ({ userName, sectionType, totalItems, onRequestError }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<Items>([]);
  const [currentItemPage, setCurrentItemPage] = useState(1);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const loaderEntry = useIntersectionObserver(loaderRef, {});
  const isLoaderVisible = !!loaderEntry?.isIntersecting;

  const totalItemPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const isFullyLoaded = currentItemPage === totalItemPages;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const abortController = useMemo(() => new AbortController(), []);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `${BASE_URL}/users/${userName}/${sectionType}?page=${currentItemPage}&per_page=${ITEMS_PER_PAGE}`,
      {
        signal: abortController.signal,
      },
    )
      .then(handleErrors)
      .then((fetchedItems: Items) => {
        setItems((prevItems: Items) => [...prevItems, ...fetchedItems]);
      })
      .catch((error) => {
        onRequestError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItemPage]);

  useEffect(() => {
    if (isLoaderVisible && !isFullyLoaded) {
      setCurrentItemPage((prevCurrentItemPage) => prevCurrentItemPage + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaderVisible, totalItemPages]);

  return (
    <>
      <Main>
        {totalItems === 0 && (
          <EmptyMsg>
            <Typography variant="h6" sx={{ color: 'neutral.light' }}>
              {`No ${sectionType} added`}
            </Typography>
          </EmptyMsg>
        )}
        {items.map((item) => (
          <Card key={item.id} theme={sectionType} data={item} />
        ))}
      </Main>
      {!isFullyLoaded && (
        <LoaderWrapper ref={loaderRef}>
          {isLoading && <CircularProgress className="loaderIcon" size={30} thickness={5} />}
        </LoaderWrapper>
      )}
    </>
  );
};

export default UserSection;
