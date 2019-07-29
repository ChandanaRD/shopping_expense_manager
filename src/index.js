import React from 'react';
import ReactDOM from 'react-dom';
// import ItemBox from './components/ItemBox';
import Item from './components/Item';
import Header from './components/Header';

const Index = () => {
    return (<div>
        <Header></Header>
        <Item></Item>
            </div>);
};
ReactDOM.render(<Index />, document.querySelector('#root'));