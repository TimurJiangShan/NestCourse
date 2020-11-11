import React from 'react';
import styles from './index.less';
import ProductList from '@/components/ProductList';

export default () => {

  return (
    <div>
      <h1 className={styles.title}>Net Music</h1>
      <ProductList />
    </div>
  );
}
