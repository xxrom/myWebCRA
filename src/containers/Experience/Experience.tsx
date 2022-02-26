import styled, {css} from 'styled-components';
import MD from 'react-markdown';
import cx from 'classnames';
import {Container, Text, Image, ImageBox} from '../../components';
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
  Sber job description
  `,
};
const yandexInfo: JobProps['info'] = {
  title: 'Yandex',
  description: `
  # Yandex job description
  `,
};
const vtbInfo: JobProps['info'] = {
  title: 'VTB',
  description: `
  Jan. 2019 - Jun. 2021: **VTB**

  **Project** - multi-user 👫 online editor 📝 
  
  - 👉 like MS Word based on markdown
  - ⚪ chats / comments
  - ⚪ version control
  - ⚪ custom plugins

  **Responsiblities**:

  - 🪴 built and maintained projects from scratch
  - ◽ development / team-leading / project actualization / testing
  - 🚀 optimized project build for 40% from 3min to 1:50 min 
  - ◽ mentorship team members
  - 👨‍💻 interviewing for team (20+ candidates)
   
  `,
};
const sphereInfo: JobProps['info'] = {
  title: 'Sphere',
  description: `
  # Sphere info
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
    <Popup onClick={onClick}>
      <PopupContent>
        <Text variant="h1" className={popupTitleCss}>
          {title}
        </Text>

        <Text
          variant="h3"
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

        <Image onClick={onClick} src={imgSrc} />
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
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: ${theme.colors.bg};
  border: 5px solid red;
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
const popupTitleCss = css`
  display: flex;
  margin-bottom: 2rem;
`;

const popupDescriptionCss = css`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
