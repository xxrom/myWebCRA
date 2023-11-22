import { Link, Outlet } from 'react-router-dom';
import { css, cx } from '@linaria/core';
import { styled } from '@linaria/react';
import { Text } from '../components';
import { fontCommon } from '../components/Text';
import { theme } from '../theme';
import { memo, useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks';

export const Layout = memo(() => {
  const navRef = useRef<HTMLElement>(null);
  const [navHeight, setNavHeight] = useState(100);
  //const { scrollY } = useScroll();
  const { components } = useInView();

  const visibleComponents = Object.values(components).filter(
    (c: any) => c?.isInView
  );
  console.log('LAYOUT', components);
  console.log('visibleComponents', visibleComponents);
  const isDarkBackground = visibleComponents.some(
    (c: any) => c.offsetTop < navHeight / 2
  );
  console.log('isDarkBackground', isDarkBackground);
  //const isDarkBackground = scrollY < 945 - navHeight / 2;

  useEffect(() => {
    if (!navRef.current) {
      return;
    }

    const height = navRef?.current?.clientHeight;

    setNavHeight(height);
  }, []);

  return (
    <Wrapper>
      <Nav ref={navRef} className={cx(isDarkBackground && darkNavCSS)}>
        <Ul>
          <Li className={mobileHideTextCss}>
            <LinkMin to="/" className={fontCommon}>
              <Text variant="h3" className={mobileHideTextCss}>
                Chernyshov Nikita
              </Text>
            </LinkMin>
          </Li>

          <Li>
            <Text
              variant="link-h5"
              className={linksAlignFixH3}
              href="https://www.linkedin.com/in/chernyshovn/"
            >
              LinkedIn
            </Text>
          </Li>

          <Li>
            <Text
              variant="link-h5"
              className={linksAlignFixH3}
              href="mailto:chernyshovnm@gmail.com"
            >
              eMail
            </Text>
          </Li>
          <Li>
            <Text
              variant="link-h5"
              className={linksAlignFixH3}
              href="https://github.com/workxrom"
            >
              GitHub
            </Text>
          </Li>
        </Ul>
      </Nav>

      <Main>
        <Outlet />
      </Main>

      <Footer>
        <Text className={footerItemCss} variant="h5">
          Chernyshovn
        </Text>

        <div>
          <Text
            className={footerItemCss}
            variant="link-h5"
            href="https://www.linkedin.com/in/chernyshovn/"
          >
            linkedin
          </Text>

          <Text
            className={footerItemCss}
            variant="link-h5"
            href="mailto:chernyshovnm@gmail.com"
          >
            mail
          </Text>

          <Text
            className={footerItemCss}
            variant="link-h5"
            href="https://github.com/workxrom"
          >
            git
          </Text>
        </div>
      </Footer>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100vw;
`;

const Main = styled.main``;

const darkNavCSS = css`
  * {
    color: white;
  }

  &&::before {
    background: #000000bb;
  }
`;

const Nav = styled.nav`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;

  min-width: 100%;
  min-height: ${theme.sizes.nav.height}px;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;

    background: #ffffff55;

    top: 0px; /* -blur */
    left: 0px; /* -blur */
    width: calc(100%); /* 100% + blur * 2 */
    height: calc(100%); /* 100% + blur * 2 */
    background-position: 100%;
    z-index: 9;
    backdrop-filter: blur(12px);

    transition: background-color 0.5s ease-in-out;
  }

  * {
    transition: color 0.5s ease-in-out;
  }
`;

const Ul = styled.ul`
  display: flex;
  flex: 1;

  align-items: flex-end;
  justify-content: space-between;
  list-style-type: none;

  margin: 0;
  padding: 0.5rem 1rem;
  overflow-x: hidden;

  @media screen and (max-width: 575px) {
    padding: 0.5rem;
  }
`;

const Li = styled.li`
  padding: 0 1rem;
  padding-bottom: 0.5rem;
  z-index: 11;

  @media screen and (max-width: 575px) {
    padding: 0 0.5rem;
    padding-bottom: 0.5rem;
  }
`;

const linksAlignFixH3 = css`
  line-height: 1.65;
`;

const LinkMin = styled(Link)`
  text-decoration: none;
  font-size: calc(24px + (48 - 24) * (100vw -400px) / (1600 -400));
`;

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: space-between;
  align-items: flex-end;
  background: ${theme.colors.bgInverted};
  padding: 3rem 1rem;

  @media screen and (max-width: 575px) {
    padding: 2rem 0.5rem;
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
