import Head from 'next/head';
import {NavigationComponent} from '../components/clientSide/NavigationComponent';
import { HomeLayout } from 'src/components/clientSide/home-layout';
import {Explore} from 'src/components/clientSide/Explore';
import {Banner} from 'src/components/clientSide/Banner';
import Cards from 'src/components/clientSide/Cards';

const Home = () => {

  return (
  <>
    <Head>
      <title>Acceuil | {process.env.APP_NAME}</title>
    </Head>
    <NavigationComponent/>
    
    <main>
      <Explore/>
      <Banner/>
      <Cards/>
    </main>
  </>
  )
}

Home.getLayout = (page) => (
  <HomeLayout>
    {page}
  </HomeLayout>
);

export default Home;
