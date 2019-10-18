import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import NotefulContext from '../DATA/NotefulContext'
import PropTypes from 'prop-types'
import config from '../config'
export default class NoteSpecific extends Component{
  
  static contextType = NotefulContext
  
  
  deleteRequest = (note) => {
   
    const noteToDelete = parseInt(note)
     fetch(`${config.API_ENDPOINT_NOTES}/${noteToDelete}`,{
         method:'DELETE',
         headers: {
            'content-type':'application/json',
            'Authorization': `${config.API_KEY}`
          },
     }).then(response => {
         if (!response.ok){
             return response.json().then(error=>{
                 throw error 
             })
         } 
     }).then(data => {
         this.context.Delete(note)
     })
     .catch(error => {
         console.error(error)
     })
 
 }
  
  render(){

    //returns a list of notes (from a filtered list)
    return (
            <ul className="note-collection">
                {this.props.notesdata.map(note=>{
                    return <li className="NoteBox" key={note.id}><Link className="notelinks" to={`/note/${note.id}`}>{note.title}</Link><p>{note.modified}</p><button onClick={()=> {this.deleteRequest(note.id)}} className="delete-button">Delete</button></li>
                })}
                <Link className="AddnoteLink" to={`/AddNote`}>AddNote</Link>
            </ul>
           )

}
}

NoteSpecific.propTypes ={
  notesdata: PropTypes.arrayOf(PropTypes.object)
}