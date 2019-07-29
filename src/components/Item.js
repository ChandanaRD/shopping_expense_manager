import React from 'react';
import ItemBox from './ItemBox';
import '../styles/Item.css';
import '../styles/common.css';

class Item extends React.Component {
    constructor(props) {
        console.log('Item constructer called')
        super(props);
        this.state = {
            'itemList': [],
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
        if (this.state.itemList.length > 0) {
            this.state.itemList.forEach(({ id }) => {
                if (id === "it" + newID && newID <= this.state.itemList.length) {
                    newID++;
                } else {
                    return "it" + newID;
                }
            })
        } else {
            return 'it0';
        }
    }

    addItem = () => {
        console.log('inside addItem');
        var id = 'it' + this.state.itemList.length;
        var addNote = new Request('http://localhost:3001/blueNotes/addItem', {
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
                        this.setState({ itemList: data, isLoading: false })
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
        var itemIndex = this.state.itemList.findIndex(({ id }) => {
            return id === itemid;
        });
        var newitemList = this.state.itemList.slice();
        if(!newitemList[itemIndex].disabled){
            this.setState({ isLoading: true });
            var editNote = new Request('http://localhost:3001/blueNotes/editItem' + itemid, {
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
                            this.setState({ itemList: data, isLoading: false })
                        else
                            this.setState({ isLoading: false, isError: true })
                    })
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ isLoading: false, isError: true })
                })
        } else {
            newitemList[itemIndex].disabled = false;
        }
        this.setState({ 'itemList': newitemList })
    }

    onDoneToggle = (itemid) => {
        console.log('inside done');
        var itemIndex = this.state.itemList.findIndex(({ id }) => {
            return id === itemid;
        });
        var noteDone = new Request('http://localhost:3001/blueNotes/editItem' + itemid, {
                method: 'put',
                body: JSON.stringify({ disabled: true, done: !this.state.itemList[itemIndex].done }),
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
                            this.setState({ itemList: data, isLoading: false })
                        else
                            this.setState({ isLoading: false, isError: true })
                    })
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ isLoading: false, isError: true })
                })
        // var newitemList = this.state.itemList.slice();
        // newitemList[itemIndex].done = newitemList[itemIndex].done ? false : true;
        // newitemList[itemIndex].disabled = true;
        // this.setState({ 'itemList': newitemList })
    }

    deleteItem = (itemid) => {
        console.log('delete item');
        var ids = [];
        ids.push(itemid);
        // var newitemList = this.state.itemList.filter(({ id }) => {
        //     return id !== itemid;
        // });
        // this.setState({ 'itemList': newitemList })

        var deleteNote = new Request('http://localhost:3001/blueNotes/deleteItem', {
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
                    this.setState({ itemList: data, isLoading: false })
                else
                    this.setState({ isLoading: false, isError: true })
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false, isError: true })
            })
    }

    displayItem = () => {
        if (this.state.itemList.length !== 0) {
            console.log('items=>');
            return (
                this.state.itemList.map((item) => {
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
        var getblueNotes = new Request('http://localhost:3001/blueNotes/getItems', {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
        this.setState({ isLoading: true });
        fetch(getblueNotes)
            .then(response => response.json())
            .then(data => {
                if (data)
                    this.setState({ itemList: data, isLoading: false })
                else
                    this.setState({ isLoading: false, isError: true })
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false, isError: true })
            })
    }

    render() {
        return (<div className='Item'>
            <div className='header'>
                <div className="ui vertical animated button primary" onClick={() => { this.addItem() }} >
                    <div className="hidden content">Add</div>
                    <div className="visible content">
                        <i className="plus icon"></i>
                    </div>
                </div>
            </div>
            {
                this.displayItem()
            }
        </div>);
    }
}

export default Item;