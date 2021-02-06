import React, { FC } from 'react'

import Footer from '../components/Footer';
import Form from '../components/Form';
import { HelloPageContext } from '../components/Form/hooks';
import Header from '../components/Header';

const Hello: FC<{}> = () => {
  // 任意のデータソースから集約されたデータストア(アダプター)のContext
  const value = {
    foo: {
      value: 'context'
    },
  }; // useHelloPageContextValue(initialValue);

  return (
    <HelloPageContext.Provider value={value}>
      <Header />
      <Form />
      <Footer />
    </HelloPageContext.Provider>
  );
}

export default Hello
