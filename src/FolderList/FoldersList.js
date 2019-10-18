import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import NotefulContext from '../DATA/NotefulContext'



export default class FolderList extends Component{
    static contextType = NotefulContext
   
    render(){ 

    //returns a list of folders from the original data list
   
return(
    <ul className="folder-section">
        {this.context.folders.map(folder=>{
        return <li className="folder" key={folder.id}><NavLink className="linktofolder" activeClassName="selected-folder" to={`/folder/${folder.id}`}>{folder.title}</NavLink></li>})} 
        <NavLink className="AddfolderLink" to={`/AddFolder`}>Add Folder</NavLink>
    </ul>
)
   }
}