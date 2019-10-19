import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import NotefulContext from '../DATA/NotefulContext'

export default class FolderListNote extends Component{
    static contextType = NotefulContext
  
    render(){
    //extract from context
    const fold = this.context.folders.map(f=> f);
    //find the folder id matching the props input 
    // and extract the title 
    const newFold = fold.filter(f=> f.id === parseInt(this.props.Data))
    const folderTitle = newFold.map(folder => folder.title)
    return(
        <ul className="NoteSpecific"> 
          
          <h3 className="folder-note-show" key={this.props.Data}>Current Folder: <p></p> {folderTitle}</h3>
          <NavLink className="go-back" to={`/`}>Go back</NavLink>
        </ul>
      
    )
}

}

FolderListNote.propTypes = {
  Data:PropTypes.array
}

