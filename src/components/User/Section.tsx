import { useState, useEffect, useMemo, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import SectionItem from './SectionItem';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { handleErrors } from '../../utils/request';
import { SectionType, Repo, User } from '../../utils/types';

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
  minHeight: 120,
  width: '100%',
});

const EmptyMsg = styled('div')({
  display: 'flex',
  marginTop: 8,
});

type Items = Repo[] & User[];

type Props = {
  userLogin: string;
  sectionType: SectionType;
  totalItems: number;
  onRequestError: (errorMessage: string) => void;
};

const Section = ({ userLogin, sectionType, totalItems, onRequestError }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [items, setItems] = useState<Items>([]);
  const [currentItemPage, setCurrentItemPage] = useState(1);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const loaderEntry = useIntersectionObserver(loaderRef, {});
  const isLoaderVisible = !!loaderEntry?.isIntersecting;

  const itemsPerPage = sectionType === 'repos' ? 12 : 20;
  const totalItemPages = Math.ceil(totalItems / itemsPerPage);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const abortController = useMemo(() => new AbortController(), []);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    fetch(
      `${process.env.REACT_APP_BASE_URL}/users/${userLogin}/${sectionType}?page=${currentItemPage}&per_page=${itemsPerPage}`,
      {
        signal: abortController.signal,
      },
    )
      .then(handleErrors)
      .then((fetchedItems: Items) => {
        setIsInitialLoad(false);
        setIsLoading(false);
        setItems((prevItems: Items) => [...prevItems, ...fetchedItems]);
        setIsFullyLoaded(currentItemPage === totalItemPages);
      })
      .catch((error) => {
        setIsLoading(false);
        onRequestError(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItemPage]);

  useEffect(() => {
    if (isLoaderVisible && !isInitialLoad && !isFullyLoaded) {
      setCurrentItemPage((prevCurrentItemPage) => prevCurrentItemPage + 1);
      setIsLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaderVisible]);

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
          <SectionItem key={item.id} theme={sectionType} data={item} />
        ))}
      </Main>
      {!isFullyLoaded && (
        <LoaderWrapper ref={loaderRef} data-testid="loader">
          {isLoading && <CircularProgress className="loaderIcon" size={30} thickness={5} />}
        </LoaderWrapper>
      )}
    </>
  );
};

export default Section;
