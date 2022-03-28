// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type ExampleRoute = {
  readonly path: string;
  readonly title: string;
};

export interface ExampleRoutes {
  readonly Home: ExampleRoute;
  readonly About: ExampleRoute;
}
