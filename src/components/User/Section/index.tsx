import { useState, useEffect, useMemo, useRef } from 'react';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import SectionItem from '../SectionItem';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { API_BASE_URL, formatRequest } from '@/utils/request';
import { SectionType, Repo, User } from '@/utils/types';
import { StyledRoot, StyledEmptyMsg, StyledLoaderWrapper } from './styles';

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
      `${API_BASE_URL}/users/${userLogin}/${sectionType}?page=${currentItemPage}&per_page=${itemsPerPage}`,
      {
        signal: abortController.signal,
      },
    )
      .then(formatRequest)
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
      <StyledRoot data-testid="section">
        {totalItems === 0 && (
          <StyledEmptyMsg>
            <Typography variant="h6" sx={{ color: 'neutral.main' }}>
              {`No ${sectionType} added`}
            </Typography>
          </StyledEmptyMsg>
        )}
        {items.map((item) => (
          <SectionItem key={item.id} theme={sectionType} data={item} />
        ))}
      </StyledRoot>
      {!isFullyLoaded && (
        <StyledLoaderWrapper ref={loaderRef}>
          {isLoading && <CircularProgress className="loaderIcon" size={30} thickness={5} />}
        </StyledLoaderWrapper>
      )}
    </>
  );
};

export default Section;
