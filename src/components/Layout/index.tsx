import { FC, ReactNode } from 'react';
import { Container } from 'react-bootstrap';

import { Header } from './Header';
import { Navbar } from './Navbar';

type LayoutType = {
  children: ReactNode;
};

export const Layout: FC<LayoutType> = ({ children }) => {
  return (
    <>
      <Header />
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};
