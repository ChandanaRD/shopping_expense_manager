import React from 'react';
import ReactDOM from 'react-dom';
// import ItemBox from './components/ItemBox';
import Item from './components/Item';
import Header from './components/Header';
import List from './components/List';

const Index = () => {
    return (<div>
        <Header></Header>
        <List></List>
        {/* <Item></Item> */}
            </div>);
};
ReactDOM.render(<Index />, document.querySelector('#root'));