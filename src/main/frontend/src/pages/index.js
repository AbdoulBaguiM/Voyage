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
    <div style={{marginTop: '130px'}}>
      <NavigationComponent/>
      
      <main>
        <Explore/>
        <Banner/>
        <Cards/>
      </main>
    </div>
  </>
  )
}

Home.getLayout = (page) => (
  <HomeLayout>
    {page}
  </HomeLayout>
);

export default Home;
