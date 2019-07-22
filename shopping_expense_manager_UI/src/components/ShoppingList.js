import React from 'react';
import ItemBox from './ItemBox';
import '../styles/ShoppingList.css';
import '../styles/common.css';

class ShoppingList extends React.Component {
    constructor(props) {
        console.log('constructer called')
        super(props);
        this.state = {
            'shoppingItemList': [{'title':'Item1','done':false }, {'title':'Item2','done':false}, {'title':'Item3', 'done':false}, {'title':'Item4','done':false}]
        };
    }

    addItemToList = () =>{
        console.log("dfg");
        let newShoppingItemList = this.state.shoppingItemList.slice();
        newShoppingItemList.push({'title':'item'+(this.state.shoppingItemList.length+1), 'done':false})
        this.setState({'shoppingItemList':newShoppingItemList});
    }

    editItem = (item)=>{
        console.log(item);
        var itemIndex = this.state.shoppingItemList.findIndex((items)=>{
            return item === items.title;
        });
        console.log(itemIndex);
        var newShoppingItemList = this.state.shoppingItemList.slice();
        newShoppingItemList[itemIndex].title = 'newItem';
        this.setState({'shoppingItemList':newShoppingItemList})
    }

    itemDone = (item) =>{
        console.log('itemDone');
        var itemIndex = this.state.shoppingItemList.findIndex((items)=>{
            return item === items.title;
        });
        var newShoppingItemList = this.state.shoppingItemList.slice();
        newShoppingItemList[itemIndex].done = true;
        this.setState({'shoppingItemList':newShoppingItemList})
    }

    deleteItem = (item) =>{
        console.log('deleteItem');
        var newShoppingItemList = this.state.shoppingItemList.filter((items)=>{
            return item !== items.title;
        });
        this.setState({'shoppingItemList':newShoppingItemList})
    }

    render() {
        return (<div className='ShoppingList'>
            <div className='header'>
                <div className="ui vertical animated button primary" onClick ={()=>{this.addItemToList()}} >
                    <div className="hidden content">Add</div>
                    <div className="visible content">
                        <i className="plus icon"></i>
                    </div>
                </div>
            </div>
            {
                this.state.shoppingItemList.map((item) => {
                    console.log(item);
                    return (<ItemBox content={item.title} onEdit={this.editItem} onDelete = {this.deleteItem} onDone = {this.itemDone} done = {item.done}></ItemBox>)
                })
            }
        </div>);
    }
}

export default ShoppingList;