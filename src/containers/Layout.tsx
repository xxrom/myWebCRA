import {Link, Outlet} from 'react-router-dom';
import styled from 'styled-components';
import {Text} from '../components';
import {fontCommon} from '../components/Text';
import {theme} from '../theme';

export const Layout = () => (
  <div>
    <Nav>
      <Ul>
        <Li>
          <LinkMin to="/">
            <Text variant="h3">Chernyshov Nikita</Text>
          </LinkMin>
        </Li>
        <Li>
          <LinkMin to="/new">New</LinkMin>
        </Li>
        <Li>
          <LinkMin to="/ui">UI</LinkMin>
        </Li>
      </Ul>
    </Nav>

    <main>
      <Outlet />
    </main>
  </div>
);

const Nav = styled.nav`
  display: flex;
  position: sticky;
  top: 0;
  background: ${theme.colors.bg50};

  min-height: ${theme.sizes.nav.height}px;
  max-height: ${theme.sizes.nav.height}px;
`;

const Ul = styled.ul`
  display: flex;
  flex: 1;

  align-items: center;
  justify-content: space-between;
  list-style-type: none;

  margin: 0;
  padding: 0;
`;

const Li = styled.li`
  padding: 0 1rem;
`;

const LinkMin = styled(Link)`
  ${fontCommon};

  text-decoration: none;
  font-size: calc(24px + (48 - 24) * (100vw -400px) / (1600 -400));
`;
