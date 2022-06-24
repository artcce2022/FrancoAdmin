import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { ProductContext } from 'context/Context';
import { productReducer } from 'reducers/productReducer';

const ProductProvider = ({ children }) => {
  const initData = {};
  const [productsState, productsDispatch] = useReducer(
    productReducer,
    initData
  );

  const isInShoppingCart = id =>
    !!productsState.cartItems.find(cartItem => cartItem.id === id);
  const isInFavouriteItems = id =>
    !!productsState.favouriteItems.find(
      favouriteItem => favouriteItem.id === id
    );

  return (
    <ProductContext.Provider
      value={{
        productsState,
        productsDispatch,
        isInShoppingCart,
        isInFavouriteItems
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProductProvider;
