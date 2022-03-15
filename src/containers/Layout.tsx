import {Link, Outlet} from 'react-router-dom';
import styled, {css} from 'styled-components';
import {Text} from '../components';
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
          <Text variant="link-h5" href="mailto:chernyshovnm@gmail.com">
            mail 📬
          </Text>
        </Li>

        <Li>
          <Text
            variant="link-h5"
            href="https://www.linkedin.com/in/chernyshovn/">
            linkedin 🚀
          </Text>
        </Li>
      </Ul>
    </Nav>

    <main>
      <Outlet />
    </main>

    <Footer>
      <Text className={footerItemCss} variant="h5">
        Design by Chernyshov
      </Text>

      <Text
        className={footerItemCss}
        variant="link-h3"
        href="mailto:chernyshovnm@gmail.com">
        mail
      </Text>

      <Li>
        <LinkMin to="/test0">
          <Text className={footerItemCss} variant="link-h3">
            test0
          </Text>
        </LinkMin>
      </Li>

      <Text
        className={footerItemCss}
        variant="link-h3"
        href="https://www.linkedin.com/in/chernyshovn/">
        linkedin
      </Text>
    </Footer>
  </div>
);

const Nav = styled.nav`
  display: flex;
  position: sticky;
  top: 0;

  min-height: ${theme.sizes.nav.height}px;
  max-height: ${theme.sizes.nav.height}px;
  z-index: 10;
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

  @media screen and (max-width: 575px) {
    padding: 0 0.5rem;
  }
`;

const LinkMin = styled(Link)`
  ${fontCommon};

  text-decoration: none;
  font-size: calc(24px + (48 - 24) * (100vw -400px) / (1600 -400));
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${theme.colors.bgInverted};
  padding: 5rem 1rem;

  @media screen and (max-width: 575px) {
    padding: 3rem 0.5rem;
  }
`;
const footerItemCss = css`
  padding: 0 2rem;
  color: ${theme.colors.primaryInverted};

  @media screen and (max-width: 575px) {
    padding: 0 0.5rem;
  }
`;
