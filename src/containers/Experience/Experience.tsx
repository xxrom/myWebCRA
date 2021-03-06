import styled, {css} from 'styled-components';
import MD from 'react-markdown';
import cx from 'classnames';
import {Container, Text, Image, ImageBox, Button} from '../../components';
import {theme} from '../../theme';
import sber from './sber.png';
import yandex from './yandex.jpg';
import vtb from './vtb.png';
import sphere from './sphere.png';
import {useCallback, useEffect, useState} from 'react';
import {blockMarginCss} from '../../components/Text';
import {commonMdCss} from '../../commonStyles';

const sberInfo: JobProps['info'] = {
  title: 'Sber',
  description: `
  Oct. 2016 - Aug. 2018: Sberbank, Moscow, Russia

  **Project**: 

  - ð debit cards ordering system at bank branches 
  - ð entering customers **personal information** like phone, email, name and so on

  **Responsiblities**:
  - â― development / code review / testing
  - â― interviewing for team (**5+** candidates)

  **Stack**:

  - â―**React**, React-Native, Redux, Jasmine/Karma/Selenium, git, JIRA`,
};
const yandexInfo: JobProps['info'] = {
  title: 'Yandex',
  description: `
  Aug. 2018 - Jan. 2019: Yandex, Moscow, Russia

  **Project Yandex News**: 

  - ð biggest news platform 
  - ð stock charts 
  - ð all kind of news 

  **Responsiblities**:
  - ðŠī  developed componet **Carousel** for images (like in Instagram) 
  - â― development / code review / testing
  - â― adapted **new header component** (with search integration)

  **Stack**:

  - â― **React**, bem, i-bem, jQuery, Hermione(Jest), GIT(merge/rebase), grep
  `,
};
const vtbInfo: JobProps['info'] = {
  title: 'VTB bank',
  description: `
  Jan. 2019 - Jun. 2021: VTB bank, Moscow, Russia

  **Project**: 

  - ð **multi-user** ðŦ online editor ð 
  - ð like online MS Word based on markdown
  - ð **chats** / comments
  - ð version control
  - ð custom **plugins**

  **Responsiblities**:
  - ðŠī  built and maintained projects **from** **scratch**
  - â― development / team-leading / project actualization / testing
  - ð optimized project build for **40%** from 3min to 1:50 min 
  - â― mentorship of team members
  - ðĻâðŧ interviewing for team (**20+** candidates)

  **Stack**:

  - â― **React**, TypeScript, GraphQL, apollo, linaria, WebSocket, nextJS
  - â― Redux, **Saga**, Webpack, docker, (ES/commit/style)lint, GIT
  `,
};
const sphereInfo: JobProps['info'] = {
  title: 'Sphere inc',
  description: `
  Jun. 2021 - now: Sphere, North Miami Beach, FL 

  **Project BP** (british petroleum): 

  - ð marketing website 
  - ð contentful 
  - ð apollo (graphQL) 
  - ð k8s

  **Responsiblities**:

  - ðŠī  development/  code review / project actualization / testing
  - â― ui-kit development

  **Stack**:
  - â― **React**, TypeScript, GraphQL, Apollo, **contentful**
  `,
};

export type ExperienceProps = {};

export const Experience = ({}: ExperienceProps) => {
  return (
    <Container className={containerCss}>
      <Text variant="h1" className={blockMarginCss}>
        Experience:
      </Text>

      <Container className={jobsContainerCss} isEnabledPaddingBottom={false}>
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

const Job = ({imgSrc = sber, info}: JobProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const onClick = useCallback(() => setIsOpened(!isOpened), [isOpened]);

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

  const {title = '', description = ''} = info;

  const popupContent = (
    <Popup>
      <PopupContent>
        <CloseButton>
          <Button onClick={onClick}>close</Button>
        </CloseButton>

        <Text variant="h1" className={popupTitleCss}>
          {title}
        </Text>

        <Text
          variant="h4"
          isColumn
          className={cx(popupDescriptionCss, commonMdCss)}>
          <MD>{description}</MD>
        </Text>
      </PopupContent>
    </Popup>
  );

  return (
    <JobWrapper>
      <ImageBox>
        {isOpened && popupContent}

        <Image pulse onClick={onClick} src={imgSrc} />
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
const jobsContainerCss = css`
  flex-direction: row;
  flex-wrap: wrap;
`;

const JobWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  align-items: center;
  padding: 2rem 2rem 2.5rem;
  box-sizing: border-box;

  @media screen and (max-width: 575px) {
    padding: 1rem 1rem 2rem;
  }
`;

const Popup = styled.div`
  position: fixed;
  display: flex;
  top: 2vh;
  left: 2vw;
  height: 96vh;
  width: 96vw;
  background: ${theme.colors.bg};
  border: 5px solid ${theme.colors.bg50};
  border-radius: ${theme.sizes.borderRadius};
  z-index: 11;
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
`;
const CloseButton = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 1rem;
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
