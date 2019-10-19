import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import NotefulContext from '../DATA/NotefulContext'
import config from '../config'

export default class Note extends Component {
    static contextType = NotefulContext




    deleteRequest = (note) => {
    
        const noteInteger = parseInt(note)
        fetch(`${config.API_ENDPOINT_NOTES}/${noteInteger}`,{
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
// List of original notes is returned with a link. 

    render(){    
        const notes = this.context.Notes.map(note=>{
            return <li className="NoteBox" key={note.id}><Link className="notelinks" to={`/note/${note.id}`}>{note.title}</Link><button onClick={()=> {this.deleteRequest(note.id)}} className="delete-button">Delete</button></li>
         });
    
        return (
        <ul className="note-collection">
         {notes}
         <Link className="AddnoteLink" to={`/AddNote`}>AddNote</Link>
        </ul>
            )
        }
}

