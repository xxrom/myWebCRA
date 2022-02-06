import {memo} from 'react';

export type HomeProps = {};

export const Home = memo((props: HomeProps) => {
  console.log('Home props, ', props);

  return <div>Home</div>;
})

Home.displayName = 'Home'; //nameof(Home);
