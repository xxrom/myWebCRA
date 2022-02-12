import styled, {css} from 'styled-components';
import {Container, Text} from '../../components';
import {theme} from '../../theme';
import sber from './sber.png';
import yandex from './yandex.jpg';
import vtb from './vtb.png';
import sphere from './sphere.png';

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
  return (
    <JobWrapper>
      <ImageBox>
        <Image src={imgSrc} />
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
  padding: 1rem 1rem 2.5rem;
  box-sizing: border-box;
`;

const ImageBox = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  min-height: 250px;
  min-width: 250px;
  max-width: 500px;

  margin-bottom: 0.5rem;
`;

const jobCss = css`
  display: flex;
  color: ${theme.colors.font};
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  height: 100%;
  width: 100%;

  z-index: -1;
  object-fit: cover;
`;
