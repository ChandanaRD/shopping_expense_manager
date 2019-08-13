import React from 'react';
import Item from './Item';
import '../styles/List.css';
import '../styles/common.css';

class List extends React.Component {
    constructor(props) {
        console.log('List constructer called')
        super(props);
        this.state = {
            'ListArray': [],
            'isError': false,
            'isLoading': false,
        };
        this.header = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
    }

    openList = (e, list) => {
        console.log("name:", list);
        var openlist = new Request('http://localhost:3001/blueNotes/getItems'+list.listId, {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
        this.setState({ isLoading: true });
        fetch(openlist)
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

    // generateItemId = () => {
    //     var newID = 0;
    //     if (this.state.ListArray.length > 0) {
    //         this.state.ListArray.forEach(({ id }) => {
    //             if (id === "it" + newID && newID <= this.state.ListArray.length) {
    //                 newID++;
    //             } else {
    //                 return "it" + newID;
    //             }
    //         })
    //     } else {
    //         return 'it0';
    //     }
    // }

    addList = () => {
        console.log('inside addList');
        var id = 'Li' + this.state.ListArray.length;
        var addList = new Request('http://localhost:3001/blueNotes/addList', {
            method: 'post',
            body: JSON.stringify({ 'listId': id, 'title': '', 'done': false, password:'',desc:'',itemArray:[],categoryId:''}),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
        this.setState({ isLoading: true });
        fetch(addList)
            .then(response => {
                console.log(response)
                response.json().then(data => {
                    console.log("data:"+data);
                    if (data)
                        this.setState({ ListArray: data, isLoading: false })
                    else
                        this.setState({ isLoading: false, isError: true })
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false, isError: true })
            })
    }

    // editItem = (itemid, newval) => {
    //     console.log('inside editItem');
    //     var itemIndex = this.state.ListArray.findIndex(({ id }) => {
    //         return id === itemid;
    //     });
    //     var newitemList = this.state.ListArray.slice();
    //     if(!newitemList[itemIndex].disabled){
    //         this.setState({ isLoading: true });
    //         var editNote = new Request('http://localhost:3001/blueNotes/editNote' + itemid, {
    //             method: 'put',
    //             body: JSON.stringify({ title: newval, disabled: true }),
    //             headers: {
    //                 'Access-Control-Allow-Origin': '*',
    //                 'Content-Type': 'application/json'
    //             }

    //         });
    //         fetch(editNote)
    //             .then(response => {
    //                 console.log(response)
    //                 response.json().then(data => {
    //                     if (data)
    //                         this.setState({ ListArray: data, isLoading: false })
    //                     else
    //                         this.setState({ isLoading: false, isError: true })
    //                 })
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 this.setState({ isLoading: false, isError: true })
    //             })
    //     } else {
    //         newitemList[itemIndex].disabled = false;
    //     }
    //     this.setState({ 'ListArray': newitemList })
    // }

    // onDoneToggle = (itemid) => {
    //     console.log('inside done');
    //     var itemIndex = this.state.ListArray.findIndex(({ id }) => {
    //         return id === itemid;
    //     });
    //     var noteDone = new Request('http://localhost:3001/blueNotes/editNote' + itemid, {
    //             method: 'put',
    //             body: JSON.stringify({ disabled: true, done: !this.state.ListArray[itemIndex].done }),
    //             headers: {
    //                 'Access-Control-Allow-Origin': '*',
    //                 'Content-Type': 'application/json'
    //             }

    //         });
    //         fetch(noteDone)
    //             .then(response => {
    //                 console.log(response)
    //                 response.json().then(data => {
    //                     console.log('data');
    //                     console.log(data);
    //                     if (data)
    //                         this.setState({ ListArray: data, isLoading: false })
    //                     else
    //                         this.setState({ isLoading: false, isError: true })
    //                 })
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 this.setState({ isLoading: false, isError: true })
    //             })
    //     // var newitemList = this.state.ListArray.slice();
    //     // newitemList[itemIndex].done = newitemList[itemIndex].done ? false : true;
    //     // newitemList[itemIndex].disabled = true;
    //     // this.setState({ 'ListArray': newitemList })
    // }

    // deleteItem = (itemid) => {
    //     console.log('delete list');
    //     var ids = [];
    //     ids.push(itemid);
    //     // var newitemList = this.state.ListArray.filter(({ id }) => {
    //     //     return id !== itemid;
    //     // });
    //     // this.setState({ 'ListArray': newitemList })

    //     var deleteNote = new Request('http://localhost:3001/blueNotes/deleteNote', {
    //         method: 'delete',
    //         redirect: 'follow',
    //         body:JSON.stringify({'ids':[itemid]}),
    //         headers: {
    //             'Access-Control-Allow-Origin': '*',
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     this.setState({ isLoading: true });
    //     fetch(deleteNote)
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data)
    //                 this.setState({ ListArray: data, isLoading: false })
    //             else
    //                 this.setState({ isLoading: false, isError: true })
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             this.setState({ isLoading: false, isError: true })
    //         })
    // }

    displayList = () => {
        if (this.state.ListArray.length !== 0) {
            console.log('list=>');
            return (
                this.state.ListArray.map((list) => {
                    console.log(list);
                    return (<div className='container ui fluid card '>
                    <div className="content ui " onClick={(e)=>{this.openList(e, list)}}>
                        {list.title}
                    </div>
                </div>)
                }))
        } else {
            return (<div className='zeroState'>
                <div className='zeroStateText'>
                    <i className='icon massive plus'></i>
                </div>
                <div className='zeroStateText'>
                    Create a new List
                </div>
            </div>)
        }
    }

    componentDidMount() {
        var getallLists = new Request('http://localhost:3001/blueNotes/getAllLists', {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
        this.setState({ isLoading: true });
        fetch(getallLists)
            .then(response => response.json())
            .then(data => {
                if (data)
                    this.setState({ ListArray: data, isLoading: false })
                else
                    this.setState({ isLoading: false, isError: true })
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false, isError: true })
            })
    }

    render() {
        return (<div className='List-wrapper'>
            <div className='header'>
                <button className="ui button blue " onClick={()=>{this.addList()}}><i className="plus icon"></i> Create new list</button>
            </div>
            {/* <div className="container blue">
                <button className="ui button  "> List two</button>
                
            </div>
            <div className="container blue">
            <button className="ui button  "> List three</button>
            </div> */}
            {this.displayList()}
        </div>);
    }
}

export default List;