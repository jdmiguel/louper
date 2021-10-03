import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { styled } from '@mui/material/styles';

/* molecules */
import Menu from '../../molecules/Menu';

/* atoms */
import Corner from '../../atoms/Corner';

/* utils */
import { dataModel } from '../../../utils/models';

const CornerWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
});

const Header = ({
  showMenu,
  data,
  activeSection,
  onActiveSection,
  onBackFinder,
}) => {
  useEffect(() => {
    if (activeSection !== 4) {
      return;
    }
    onBackFinder();
  }, [activeSection]);

  return (
    <header>
      {showMenu ? (
        <Menu
          data-test="user-menu"
          onClick={onActiveSection}
          withRepos={!!data.repos}
          withFollowing={!!data.following}
          withFollowers={!!data.followers}
        />
      ) : (
        <CornerWrapper>
          <Corner data-test="home-corner" />
        </CornerWrapper>
      )}
    </header>
  );
};

Header.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  data: PropTypes.oneOfType([dataModel, PropTypes.oneOf([null])]),
  activeSection: PropTypes.number,
  onActiveSection: PropTypes.func,
  onBackFinder: PropTypes.func,
};

export default Header;
