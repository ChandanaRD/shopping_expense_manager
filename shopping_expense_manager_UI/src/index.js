import React from 'react';
import ReactDOM from 'react-dom';
// import ItemBox from './components/ItemBox';
import ShoppingList from './components/ShoppingList';

const Index = () => {
    return (<div>
        <ShoppingList></ShoppingList>
            </div>);
};
ReactDOM.render(<Index />, document.querySelector('#root'));