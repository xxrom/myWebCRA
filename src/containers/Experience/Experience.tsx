import styled, {css} from 'styled-components';
import {Container, Text} from '../../components';
import {theme} from '../../theme';
import sber from './sber.png';
import yandex from './yandex.jpg';
import vtb from './vtb.png';
import sphere from './sphere.png';
import {useCallback, useState} from 'react';
import cx from 'classnames';

export type ExperienceProps = {};

export const Experience = ({}: ExperienceProps) => {
  return (
    <Container className={containerCss}>
      <Text variant="h3">Experience:</Text>

      <Container className={jobsContainerCss}>
        <Job imgSrc={sber}>SberBank</Job>
        <Job imgSrc={yandex}>Yandex</Job>
        <Job imgSrc={vtb}>VtbBank</Job>
        <Job imgSrc={sphere}>Sphere</Job>
      </Container>
    </Container>
  );
};

type JobProps = {
  imgSrc?: string;
  children: string;
};

const Job = ({imgSrc = sber, children}: JobProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const onClick = useCallback(() => setIsOpened(!isOpened), [isOpened]);

  return (
    <JobWrapper>
      <ImageBox className={cx(isOpened && openedJobBoxCss)} onClick={onClick}>
        {isOpened ? <span>Opened</span> : <Image src={imgSrc} />}
      </ImageBox>

      <Text variant="h1" className={jobCss}>
        {children}
      </Text>
    </JobWrapper>
  );
};

const containerCss = css`
  flex-direction: column;
`;
const jobsContainerCss = css`
  flex-wrap: wrap;
`;

const JobWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  align-items: center;
  padding: 2rem 2rem 2.5rem;
  box-sizing: border-box;
`;

const ImageBox = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  min-height: 250px;
  min-width: 250px;

  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  border: 1px solid red;
  overflow: hidden;

  ${props => props.className};
`;

const openedJobBoxCss = css`
  position: fixed;

  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;

  border: 5px solid red;
`;

const jobCss = css`
  display: flex;
  color: ${theme.colors.font};
`;

const Image = styled.img`
  position: relative;
  top: 0;
  left: 0;

  height: 100%;
  width: 100%;

  object-fit: cover;

  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    top: -5%;
    left: -5%;
    height: 110%;
    width: 110%;
    border-radius: 10px;
    transform: translateY(-10px);
  }
`;
