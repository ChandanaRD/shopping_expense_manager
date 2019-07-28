import React from 'react';
import ItemBox from './ItemBox';
import '../styles/ShoppingList.css';
import '../styles/common.css';

class ShoppingList extends React.Component {
    constructor(props) {
        console.log('constructer called')
        super(props);
        this.state = {
            'shoppingItemList': []
        };
    }

    generateItemId = () =>{
        var newID = 0;
        if(this.state.shoppingItemList.length>0){
            this.state.shoppingItemList.forEach(({id})=>{
                if(id==="it"+newID && newID<=this.state.shoppingItemList.length){
                    newID++;
                }else{
                    return "it"+newID;
                }
            })
        }else{
            return 'it0';
        }
    }

    addItemToList = () =>{
        console.log('inside addItemList');
        var  newShoppingItemList = this.state.shoppingItemList;
        var id = 'it'+this.state.shoppingItemList.length;
        newShoppingItemList.push({'id':id,'title':'', 'done':false, 'disabled':true});
        this.setState({'shoppingItemList':newShoppingItemList});
    }

    editItem = (itemid, newval)=>{
        console.log('inside editItem');
        var itemIndex = this.state.shoppingItemList.findIndex(({id})=>{
            return id === itemid;
        });
        var newShoppingItemList = this.state.shoppingItemList.slice();
        if(!newShoppingItemList[itemIndex].disabled){
            newShoppingItemList[itemIndex].title = newval?newval:this.state.shoppingItemList[itemIndex].title;
            newShoppingItemList[itemIndex].disabled =true;
        }else{
            newShoppingItemList[itemIndex].disabled = false;
        }
        this.setState({'shoppingItemList':newShoppingItemList})
    }

    onDoneToggle = (itemid) =>{
        console.log('inside done');
        var itemIndex = this.state.shoppingItemList.findIndex(({id})=>{
            return id === itemid;
        });
        var newShoppingItemList = this.state.shoppingItemList.slice();
        newShoppingItemList[itemIndex].done = newShoppingItemList[itemIndex].done?false:true;
        newShoppingItemList[itemIndex].disabled = true; 
        this.setState({'shoppingItemList':newShoppingItemList})
    }

    deleteItem = (itemid) =>{
        console.log('delete item');
        var newShoppingItemList = this.state.shoppingItemList.filter(({id})=>{
            return id !== itemid;
        });
        this.setState({'shoppingItemList':newShoppingItemList})
    }

    displayShoppingList = ()=>{
        if(this.state.shoppingItemList.length!==0){
            console.log('items=>');
            return(
                this.state.shoppingItemList.map((item) => {
                console.log(item);
                return (<ItemBox content={item} onEdit={this.editItem} onDelete = {this.deleteItem} onDoneToggle = {this.onDoneToggle} ></ItemBox>)
            }))
        }else{
            return(<div className='zeroState'>
                <div className='zeroStateText'>
                <i className='icon massive cart plus'></i>
                </div>
                <div className='zeroStateText'>
                    <br/>yaay! done with Shopping! <br/>
                    Add items to continue Shopping!
                </div>
            </div>)
        }
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
                this.displayShoppingList()
            }
        </div>);
    }
}

export default ShoppingList;