import {Container, Text, Image} from '../../components';
import activesoul from './activesoul.png';

export type ProjectsProps = {};

export const Projects = ({}: ProjectsProps) => {
  return (
    <Container>
      <Text variant="h3">Projects</Text>

      <Text variant="link-h3" href="https://active-soul.netlify.app/">
        ActiveSoul
      </Text>

      {/* TODO: Image add wrapper with settings for scale and height/width */}
      <Image src={activesoul} />
    </Container>
  );
};
