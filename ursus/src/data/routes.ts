export type Route = {
  readonly path: string;
  readonly title: string;
};

export type Routes = {
  readonly Home: Route;
  readonly Config: Route;
};

const routes: Routes = {
  Home: {
    path: '/ursus',
    title: 'Home'
  },
  Config: {
    path: '/config/',
    title: 'Config'
  }
};

export default routes;
