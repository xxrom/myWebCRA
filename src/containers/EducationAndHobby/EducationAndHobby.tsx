import {
  Container,
  BorderContainer,
  Text,
  ImageBox,
  Image,
} from '../../components';

import { blockMarginCss, theme } from '../../theme';
import { ComponentsCommonTypes } from '../Spline';
import me from '../Intro/me.jpg';
import { Row } from '@/components/Row';
import { styled } from '@linaria/react';
import { useCallback } from 'react';

export type EducationAndHobbyProps = ComponentsCommonTypes;

export const EducationAndHobby = ({ index }: EducationAndHobbyProps) => {
  const onClickSend = useCallback(() => {
    window?.tracker?.track('chernyshov.app', 'click', 'myPhoto');
  }, []);

  return (
    <div data-component-index={index}>
      <Container>
        <Text variant="h1" className={blockMarginCss}>
          Education:
        </Text>

        <BorderContainer margin={theme.margin.content}>
          <Text variant="h3">Glyndwr University:</Text>
          <Text variant="h5">Computer Science, Master’s degree</Text>

          <Text variant="h3">---</Text>

          <Text variant="h3">Bauman Moscow State Technical University:</Text>

          <Text variant="h5">
            School of Robotic Technologies and Complex Automatization
          </Text>
        </BorderContainer>
      </Container>

      <Container>
        <Text variant="h1">Hobbies:</Text>

        <Row>
          <MyImg onClick={onClickSend}>
            <Image src={me} aria-label="me" alt="me" />
          </MyImg>

          <BorderContainer margin="2rem 0">
            <Text variant="h3">Robots</Text>
            <Text variant="h5">
              Hexapod, balance robot (arduino, raspberry pi)
            </Text>

            <Text variant="h3">---</Text>
            <Text variant="h3">3D printing / Inventor(CAD)</Text>
            <Text variant="h5">Creating and printing different models</Text>
          </BorderContainer>
        </Row>
      </Container>
    </div>
  );
};

const MyImg = styled(ImageBox)`
  margin: 2rem;
  min-height: 300px;
  min-width: 260px;
  max-width: 320px;
`;
