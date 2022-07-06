import Head from 'next/head';
import {NavigationComponent} from '../components/clientSide/NavigationComponent';
import { HomeLayout } from 'src/components/clientSide/home-layout';
import AuthService from 'src/services/auth.service';

const Home = () => {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser);
  return (
  <>
    <Head>
      <title>Acceuil | {process.env.APP_NAME}</title>
    </Head>
    <NavigationComponent/>
  </>
  )
}

Home.getLayout = (page) => (
  <HomeLayout>
    {page}
  </HomeLayout>
);

export default Home;
