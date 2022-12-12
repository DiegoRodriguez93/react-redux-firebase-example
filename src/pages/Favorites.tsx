import { Layout } from '../components/Layout';
import { Products } from '../components/Products';

export const Favorites = () => {
  return (
    <Layout>
      <Products onlyFavorites />
    </Layout>
  );
};
