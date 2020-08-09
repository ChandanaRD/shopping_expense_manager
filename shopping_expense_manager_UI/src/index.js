import React from 'react';
import ReactDOM from 'react-dom';
// import ItemBox from './components/ItemBox';
import ShoppingList from './components/ShoppingList';
import Header from './components/Header';

const Index = () => {
  return (
    <div>
      <Header> </Header> <ShoppingList> </ShoppingList>{' '}
    </div>
  );
};
ReactDOM.render(<Index />, document.querySelector('#root'));
