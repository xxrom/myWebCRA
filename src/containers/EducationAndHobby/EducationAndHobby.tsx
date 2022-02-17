import {Container, Text, Image, ImageBox} from '../../components';
import {blockMarginCss} from '../../components/Text';
import me from './me.jpg';

export type EducationAndHobbyProps = {};

export const EducationAndHobby = ({}: EducationAndHobbyProps) => {
  return (
    <Container>
      <Text variant="h3" className={blockMarginCss}>
        Education and hobbies:
      </Text>

      <ImageBox>
        <Image src={me} />
      </ImageBox>
    </Container>
  );
};
