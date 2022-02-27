import { useState, useEffect, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '../molecules/Card';
import useWindowScroll from '../../hooks/useWindowScroll';
import { ResponseError, BASE_URL, handleErrors } from '../../utils/request';
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
  onRequestError: () => void;
};

const UserSection = ({ userName, sectionType, totalItems, onRequestError }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<Items>([]);
  const [currentItemPage, setCurrentItemPage] = useState(1);

  const totalItemPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const isFullyLoaded = currentItemPage === totalItemPages;
  const scrollRatio = useWindowScroll();

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
      .catch((error: ResponseError) => {
        if (error.status === 20) {
          return;
        }
        onRequestError();
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItemPage]);

  useEffect(() => {
    if (scrollRatio > 0.5 && !isFullyLoaded) {
      setCurrentItemPage((prevCurrentItemPage) => prevCurrentItemPage + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollRatio, totalItemPages]);

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
        <LoaderWrapper>
          {isLoading && <CircularProgress className="loaderIcon" size={30} thickness={5} />}
        </LoaderWrapper>
      )}
    </>
  );
};

export default UserSection;
