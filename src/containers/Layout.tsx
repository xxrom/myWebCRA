import {Link, Outlet} from 'react-router-dom';
import styled, {css} from 'styled-components';
import {Text} from '../components';
import {fontCommon} from '../components/Text';
import {theme} from '../theme';
import cx from 'classnames';

export const Layout = () => (
  <Wrapper>
    <Nav>
      <Ul>
        <Li className={cx(mobileHideTextCss)}>
          <LinkMin to="/">
            <Text variant="h3" className={mobileHideTextCss}>
              Chernyshov Nikita
            </Text>
          </LinkMin>
        </Li>

        <Li>
          <Text
            variant="link-h5"
            className={linksAlignFixH3}
            href="mailto:chernyshovnm@gmail.com">
            mail_📬
          </Text>
        </Li>

        <Li>
          <Text
            variant="link-h5"
            className={linksAlignFixH3}
            href="https://www.linkedin.com/in/chernyshovn/">
            linkedin_🚀
          </Text>
        </Li>
      </Ul>
    </Nav>

    <Main>
      <Outlet />
    </Main>

    <Footer>
      <Text className={cx(footerItemCss, linksAlignFixH5)} variant="h5">
        Chernyshov
      </Text>

      <div>
        <Text
          className={footerItemCss}
          variant="link-h3"
          href="mailto:chernyshovnm@gmail.com">
          mail
        </Text>

        <Text
          className={footerItemCss}
          variant="link-h3"
          href="https://www.linkedin.com/in/chernyshovn/">
          linkedin
        </Text>
      </div>
    </Footer>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  display: flex;
  flex-grow: 1;
`;
const Nav = styled.nav`
  display: flex;
  position: sticky;
  top: 0;

  min-height: ${theme.sizes.nav.height}px;
  z-index: 10;
`;

const Ul = styled.ul`
  display: flex;
  flex: 1;

  align-items: flex-end;
  justify-content: space-between;
  list-style-type: none;

  margin: 0;
  padding: 0.5rem 1rem;

  @media screen and (max-width: 575px) {
    padding: 0.5rem;
  }
`;

const Li = styled.li`
  padding: 0 1rem;
  padding-bottom: 0.5rem;

  ${props => props.className};

  @media screen and (max-width: 575px) {
    padding: 0 0.5rem;
    padding-bottom: 0.5rem;
  }
`;

const linksAlignFixH3 = css`
  line-height: 1.65;
`;
const linksAlignFixH5 = css`
  line-height: 1.45;
`;

const LinkMin = styled(Link)`
  ${fontCommon};

  text-decoration: none;
  font-size: calc(24px + (48 - 24) * (100vw -400px) / (1600 -400));
`;

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: space-between;
  align-items: flex-end;
  background: ${theme.colors.bgInverted};
  padding: 5rem 1rem;

  @media screen and (max-width: 575px) {
    padding: 3rem 0.5rem;
    justify-content: center;
  }
`;

const footerItemCss = css`
  padding: 0 2rem;
  color: ${theme.colors.primaryInverted};

  @media screen and (max-width: 575px) {
    padding: 0 0.5rem;
  }
`;

const mobileHideTextCss = css`
  @media screen and (max-width: 575px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
