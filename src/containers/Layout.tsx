import {Link, Outlet} from 'react-router-dom';
import styled from 'styled-components';
import {Button, Text} from '../components';
import {fontCommon} from '../components/Text';
import {theme} from '../theme';

export const Layout = () => (
  <div>
    <Nav>
      <Ul>
        <Li>
          <LinkMin to="/">
            <Text variant="link-h3">Chernyshov Nikita</Text>
          </LinkMin>
        </Li>

        <Li>
          <Text variant="link-h3" href="mailto:chernyshovnm@gmail.com">
            mail
          </Text>
        </Li>

        <a href={'https://www.linkedin.com/in/chernyshovn/'}></a>

        <Li>
          <Button>Menu</Button>
        </Li>
      </Ul>
    </Nav>

    <main>
      <Outlet />
    </main>
  </div>
);

/*

          <Li>
            <LinkMin to="/new">New</LinkMin>
          </Li>
          <Li>
            <LinkMin to="/ui">UI</LinkMin>
          </Li>

  background: ${theme.colors.bg50};

 */

const Nav = styled.nav`
  display: flex;
  position: sticky;
  top: 0;

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
