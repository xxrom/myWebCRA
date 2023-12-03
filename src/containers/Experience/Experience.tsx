import { styled } from '@linaria/react';
import { css, cx } from '@linaria/core';
import MD from 'react-markdown';
import { Container, Text, Image, ImageBox, Button } from '../../components';
import { blockMarginCss, mobile, tablet, theme } from '../../theme';
import sber from './sber.png';
import yandex from './yandex.jpg';
import vtb from './vtb.png';
import sphere from './sphere.png';
import { useCallback, useEffect, useState } from 'react';
import { commonMdCss } from '../../commonStyles';
import { pulseCss } from '../../components/Image';
import { ComponentsCommonTypes } from '../Spline';

const sberInfo: JobProps['info'] = {
  title: 'Sber (2+ years)',
  description: `
  Oct. 2016 - Aug. 2018: Sberbank, Moscow, Russia

  **Project**: 

  - 👉 debit cards ordering system at bank branches 
  - 👉 entering customers **personal information** like phone, email, name and so on

  **Responsiblities**:
  - ◽ development / code review / testing
  - ◽ interviewing for team (**5+** candidates)

  **Stack**:

  - ◽**React**, React-Native, Redux, Jasmine/Karma/Selenium, git, JIRA`,
};
const yandexInfo: JobProps['info'] = {
  title: 'Yandex (6+ months)',
  description: `
  Aug. 2018 - Jan. 2019: Yandex, Moscow, Russia

  **Project Yandex News**: 

  - 👉 biggest news platform 
  - 👉 stock charts 
  - 👉 all kind of news 

  **Responsiblities**:
  - 🪴  developed componet **Carousel** for images (like in Instagram) 
  - ◽ development / code review / testing
  - ◽ adapted **new header component** (with search integration)

  **Stack**:

  - ◽ **React**, bem, i-bem, jQuery, Hermione(Jest), GIT(merge/rebase), grep
  `,
};
const vtbInfo: JobProps['info'] = {
  title: 'VTB bank (2+ years)',
  description: `
  Jan. 2019 - Jun. 2021: VTB bank, Moscow, Russia

  **Project**: 

  - 👉 **multi-user** 👫 online editor 📝 
  - 👉 like online MS Word based on markdown
  - 👉 **chats** / comments
  - 👉 version control
  - 👉 custom **plugins**

  **Responsiblities**:
  - 🪴  built and maintained projects **from** **scratch**
  - ◽ development / team-leading / project actualization / testing
  - 🚀 optimized project build for **40%** from 3min to 1:50 min 
  - ◽ mentorship of team members
  - 👨‍💻 interviewing for team (**20+** candidates)

  **Stack**:

  - ◽ **React**, TypeScript, GraphQL, apollo, linaria, WebSocket, nextJS
  - ◽ Redux, **Saga**, Webpack, docker, (ES/commit/style)lint, GIT
  `,
};
const sphereInfo: JobProps['info'] = {
  title: 'Sphere inc (2+ years)',
  description: `
  Jun. 2021 - now: Sphere, North Miami Beach, FL 

  **Project BP** (british petroleum): 

  - 👉 marketing website 
  - 👉 contentful 
  - 👉 apollo (graphQL) 
  - 👉 k8s

  **Responsiblities**:

  - 🪴  development/  code review / project actualization / testing
  - ◽ ui-kit development

  **Stack**:
  - ◽ **React**, TypeScript, GraphQL, Apollo, **contentful**
  `,
};

export type ExperienceProps = ComponentsCommonTypes;

export const Experience = ({ index }: ExperienceProps) => {
  return (
    <Container data-component-index={index} className={containerCss}>
      <Text variant="h1" className={blockMarginCss}>
        Experience (over 8 years):
      </Text>

      <Container className={containerWrapCss} isEnabledPaddingBottom={false}>
        <Job info={sphereInfo} imgSrc={sphere} />
        <Job info={vtbInfo} imgSrc={vtb} />
        <Job info={yandexInfo} imgSrc={yandex} />
        <Job info={sberInfo} imgSrc={sber} />
      </Container>
    </Container>
  );
};

type JobProps = {
  imgSrc?: string;
  info: {
    title: string;
    description: string;
  };
};

const Job = ({ imgSrc = sber, info }: JobProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const onTogglePopup = useCallback(() => setIsOpened(!isOpened), [isOpened]);

  useEffect(() => {
    // Hack for disabling blobal scroll when popup opened
    if (isOpened === true) {
      const body = document.body;

      body.style.height = '100vh';
      body.style.overflowY = 'hidden';
    } else {
      const body = document.body;

      body.style.height = '';
      body.style.overflowY = '';
    }
  }, [isOpened]);

  const { title = '', description = '' } = info;

  const popupContent = (
    <Popup>
      <PopupContent>
        <CloseButton>
          <Button onClick={onTogglePopup}>close</Button>
        </CloseButton>

        <Text variant="h1" className={popupTitleCss}>
          {title}
        </Text>

        <Text
          variant="h4"
          isColumn
          className={cx(popupDescriptionCss, commonMdCss)}
        >
          <MD>{description}</MD>
        </Text>
      </PopupContent>
    </Popup>
  );

  return (
    <JobWrapper>
      <ImageBox>
        {isOpened && (
          <>
            <PopupBackground onClick={onTogglePopup} />
            {popupContent}
          </>
        )}

        <Image className={pulseCss} onClick={onTogglePopup} src={imgSrc} />
      </ImageBox>

      <Text variant="h3" className={jobTitleCss}>
        {title}
      </Text>
    </JobWrapper>
  );
};

const containerCss = css`
  flex-direction: column;
`;

export const containerWrapCss = css`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
`;

const JobWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  align-items: center;
  padding: 2rem 0.5rem;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 1.5rem 0.5rem;
  }

  @media screen and (max-width: 575px) {
    padding: 1rem 0.5;
  }
`;

const Popup = styled.div`
  position: fixed;
  left: 80px;
  top: 120px;
  display: flex;
  margin: auto;
  height: calc(100% - 200px);
  width: calc(100% - 160px);
  background: ${theme.colors.bg};
  border: 0;
  border-radius: ${theme.sizes.borderRadius};
  z-index: 11;

  @media screen and (max-width: 575px) {
    left: 20px;
    top: 100px;
    display: flex;
    margin: auto;
    height: calc(100% - 140px);
    width: calc(100% - 40px);
  }
`;
const jobTitleCss = css`
  display: flex;
  margin-top: 1rem;
  color: ${theme.colors.font};
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 5rem 1rem;
  align-items: center;
  overflow-y: scroll;
  z-index: 12;

  ${tablet(`
    padding: 3rem 2rem;
      `)};
  ${mobile(`
    padding: 2rem 1rem;
      `)};
`;
const PopupBackground = styled.div`
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #00000010;
  filter: blur(4px);
  backdrop-filter: blur(12px);
`;
const CloseButton = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 1rem;

  ${mobile(`
    padding: 0;
    margin-right: -1rem;
    margin-top: -1rem;
  `)};
`;
const popupTitleCss = css`
  display: flex;
  margin-bottom: 2rem;
`;

const popupDescriptionCss = css`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
