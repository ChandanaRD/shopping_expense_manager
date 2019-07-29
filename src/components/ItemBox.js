import React from 'react';
import '../styles/ItemBox.css';
import '../styles/common.css';

class ItemBox extends React.Component{

    constructor(props){
        super(props);
        this.state={
            'itemTitle':this.props.content.title
        };
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.content.title !== this.state.itemTitle) {
          this.setState({ itemTitle: nextProps.content.title });
        }
      }

    render(){
        let editItem = this.props.onEdit;
        let itemDoneToggle = this.props.onDoneToggle;
        let deleteItem = this.props.onDelete;
        // let newItemTitle =null;
        return (<div className='ItemBox ui fluid card '>
                <div className="content ui form">
                    <div className='field align'>
                        <input id={this.props.content.id} className={this.props.content.done?'strikeThrough item-content':'item-content'} type="text" placeholder="Click on edit icon to add description" disabled={this.props.content.disabled} value = {this.state.itemTitle} onChange={(e)=>{this.setState({'itemTitle':e.target.value})}}/>
                        <div className='ui buttons display-inline'>
                            <button className="ui button primary basic" onClick={()=>{editItem(this.props.content.id, this.state.itemTitle)}}><i className={this.props.content.disabled?'icon pencil alternate':'icon save'}></i></button>
                            <button className="ui button primary basic" onClick={()=>{itemDoneToggle(this.props.content.id)}}><i className={this.props.content.done?'icon undo':'icon check'}></i></button>
                            <button className="ui button primary basic" onClick={()=>{deleteItem(this.props.content.id)}}><i className="icon x icon"></i></button>
                        </div>
                    </div>
            </div>
    </div>)
    }
}

export default ItemBox;