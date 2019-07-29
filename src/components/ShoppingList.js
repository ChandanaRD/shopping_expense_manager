import React from 'react';
import ItemBox from './ItemBox';
import '../styles/ShoppingList.css';
import '../styles/common.css';

class ShoppingList extends React.Component {
    constructor(props) {
        console.log('constructer called')
        super(props);
        this.state = {
            'shoppingItemList': [],
            'isError': false,
            'isLoading': false,
        };
        this.header = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
    }

    generateItemId = () => {
        var newID = 0;
        if (this.state.shoppingItemList.length > 0) {
            this.state.shoppingItemList.forEach(({ id }) => {
                if (id === "it" + newID && newID <= this.state.shoppingItemList.length) {
                    newID++;
                } else {
                    return "it" + newID;
                }
            })
        } else {
            return 'it0';
        }
    }

    addItemToList = () => {
        console.log('inside addItemList');
        var id = 'it' + this.state.shoppingItemList.length;
        var addNote = new Request('http://localhost:3001/allNotes/addNote', {
            method: 'post',
            body: JSON.stringify([{ 'id': id, 'title': '', 'done': false, 'disabled': true }]),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }

        });
        this.setState({ isLoading: true });
        fetch(addNote)
            .then(response => {
                console.log(response)
                response.json().then(data => {
                    if (data)
                        this.setState({ shoppingItemList: data, isLoading: false })
                    else
                        this.setState({ isLoading: false, isError: true })
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false, isError: true })
            })
    }

    editItem = (itemid, newval) => {
        console.log('inside editItem');
        var itemIndex = this.state.shoppingItemList.findIndex(({ id }) => {
            return id === itemid;
        });
        var newShoppingItemList = this.state.shoppingItemList.slice();
        if(!newShoppingItemList[itemIndex].disabled){
            this.setState({ isLoading: true });
            var editNote = new Request('http://localhost:3001/allNotes/editNote' + itemid, {
                method: 'put',
                body: JSON.stringify({ title: newval, disabled: true }),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }

            });
            fetch(editNote)
                .then(response => {
                    console.log(response)
                    response.json().then(data => {
                        if (data)
                            this.setState({ shoppingItemList: data, isLoading: false })
                        else
                            this.setState({ isLoading: false, isError: true })
                    })
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ isLoading: false, isError: true })
                })
        } else {
            newShoppingItemList[itemIndex].disabled = false;
        }
        this.setState({ 'shoppingItemList': newShoppingItemList })
    }

    onDoneToggle = (itemid) => {
        console.log('inside done');
        var itemIndex = this.state.shoppingItemList.findIndex(({ id }) => {
            return id === itemid;
        });
        var noteDone = new Request('http://localhost:3001/allNotes/editNote' + itemid, {
                method: 'put',
                body: JSON.stringify({ disabled: true, done: !this.state.shoppingItemList[itemIndex].done }),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }

            });
            fetch(noteDone)
                .then(response => {
                    console.log(response)
                    response.json().then(data => {
                        console.log('data');
                        console.log(data);
                        if (data)
                            this.setState({ shoppingItemList: data, isLoading: false })
                        else
                            this.setState({ isLoading: false, isError: true })
                    })
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ isLoading: false, isError: true })
                })
        // var newShoppingItemList = this.state.shoppingItemList.slice();
        // newShoppingItemList[itemIndex].done = newShoppingItemList[itemIndex].done ? false : true;
        // newShoppingItemList[itemIndex].disabled = true;
        // this.setState({ 'shoppingItemList': newShoppingItemList })
    }

    deleteItem = (itemid) => {
        console.log('delete item');
        var ids = [];
        ids.push(itemid);
        // var newShoppingItemList = this.state.shoppingItemList.filter(({ id }) => {
        //     return id !== itemid;
        // });
        // this.setState({ 'shoppingItemList': newShoppingItemList })

        var deleteNote = new Request('http://localhost:3001/allNotes/deleteNote', {
            method: 'delete',
            redirect: 'follow',
            body:JSON.stringify({'ids':[itemid]}),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
        this.setState({ isLoading: true });
        fetch(deleteNote)
            .then(response => response.json())
            .then(data => {
                if (data)
                    this.setState({ shoppingItemList: data, isLoading: false })
                else
                    this.setState({ isLoading: false, isError: true })
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false, isError: true })
            })
    }

    displayShoppingList = () => {
        if (this.state.shoppingItemList.length !== 0) {
            console.log('items=>');
            return (
                this.state.shoppingItemList.map((item) => {
                    console.log(item);
                    return (<ItemBox content={item} onEdit={this.editItem} onDelete={this.deleteItem} onDoneToggle={this.onDoneToggle} ></ItemBox>)
                }))
        } else {
            return (<div className='zeroState'>
                <div className='zeroStateText'>
                    <i className='icon massive cart plus'></i>
                </div>
                <div className='zeroStateText'>
                    <br />yaay! done with Shopping! <br />
                    Add items to continue Shopping!
                </div>
            </div>)
        }
    }

    componentDidMount() {
        var getAllNotes = new Request('http://localhost:3001/allNotes/getAllNotes', {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
        this.setState({ isLoading: true });
        fetch(getAllNotes)
            .then(response => response.json())
            .then(data => {
                if (data)
                    this.setState({ shoppingItemList: data, isLoading: false })
                else
                    this.setState({ isLoading: false, isError: true })
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false, isError: true })
            })
    }

    render() {
        return (<div className='ShoppingList'>
            <div className='header'>
                <div className="ui vertical animated button primary" onClick={() => { this.addItemToList() }} >
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