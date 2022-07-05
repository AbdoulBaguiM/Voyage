import {NavigationComponent} from '../components/clientSide/NavigationComponent';
import { HomeLayout } from 'src/components/clientSide/home-layout';
import AuthService from 'src/services/auth.service';

const Home = () => {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser);
  return (
  <>
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
