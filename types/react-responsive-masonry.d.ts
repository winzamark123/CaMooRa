declare module 'react-responsive-masonry' {
  import * as React from 'react';

  interface ResponsiveMasonryProps {
    columnsCountBreakPoints: { [key: number]: number };
    children: React.ReactNode;
  }

  export class ResponsiveMasonry extends React.Component<ResponsiveMasonryProps> {}

  interface MasonryProps {
    children: React.ReactNode;
  }

  export default class Masonry extends React.Component<MasonryProps> {}
}
