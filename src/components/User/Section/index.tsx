import { useRef, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import SectionItem from '../SectionItem';
import { UserItems, UserItemsType } from '@/utils/types';
import { StyledRoot, StyledEmptyMsg } from './styles';

type Props = {
  isLoading: boolean;
  itemsType: UserItemsType;
  items: UserItems;
  areAllItemsLoaded: boolean;
  onNextPage: () => void;
};

const Section = ({ isLoading, itemsType, items, areAllItemsLoaded, onNextPage }: Props) => {
  const observer = useRef<IntersectionObserver>();
  const lastItemRef = useCallback(
    (item: HTMLDivElement) => {
      if (isLoading || areAllItemsLoaded) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          onNextPage();
        }
      });

      if (item) {
        observer.current.observe(item);
      }
    },
    [isLoading, areAllItemsLoaded, onNextPage],
  );

  const totalItems = items.length;

  return (
    <StyledRoot data-testid="section">
      {!isLoading && totalItems === 0 && (
        <StyledEmptyMsg>
          <Typography variant="h6" sx={{ color: 'neutral.main' }}>
            {`No ${itemsType} added`}
          </Typography>
        </StyledEmptyMsg>
      )}
      {items.map((item, index) => {
        if (index + 1 === totalItems) {
          return <SectionItem ref={lastItemRef} key={item.id} theme={itemsType} data={item} />;
        }
        return <SectionItem key={item.id} theme={itemsType} data={item} />;
      })}
    </StyledRoot>
  );
};

export default Section;
