import React from 'react';
import '../styles/ItemBox.css';
import '../styles/common.css';

class ItemBox extends React.Component{

    constructor(props){
        super(props);
        this.state={};
    }

    // editItem = ()=>{
    //     console.log(this.props.content);
    // }

    // itemDone = () =>{
    //     console.log('item done.');
    // }

    // deleteItem = () =>{
    //     console.log('deleting...');
    // }

    render(){
        let editItem = this.props.onEdit;
        let itemDone = this.props.onDone;
        let deleteItem = this.props.onDelete;
        return (<div className='ItemBox'>
            <div className='ui fluid card '>
                <div className="content"><div className='header align'> 
                    <div className={this.props.done?'strikeThrough':''}>
                        {this.props.content}
                    </div>
                    <div className='ui buttons'>
                        <button className="ui button primary basic" onClick={()=>{editItem(this.props.content)}}><i className="icon pencil alternate"></i></button>
                        <button className="ui button primary basic" onClick={()=>{itemDone(this.props.content)}}><i className="icon check"></i></button>
                        <button className="ui button primary basic" onClick={()=>{deleteItem(this.props.content)}}><i className="icon x icon"></i></button>
                    </div>
                </div> 
            </div>
        </div>
    </div>)
    }
}

export default ItemBox;