import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard(): JSX.Element {
  return <h1>Dashboard</h1>;
}

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {},
  };
});
