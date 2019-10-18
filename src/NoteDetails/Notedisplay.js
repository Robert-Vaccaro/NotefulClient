import React,{Component} from 'react'
import FolderListNote from '../FolderListNote/FolderListNote'
import NotefulContext from '../DATA/NotefulContext'

export default class NoteDisplay extends Component {
  static contextType = NotefulContext
  
 
  
 // returns note details by finding id in list of original data
 //Sends folderId of the note to FolderListNote component

  render(){
  //Retrieve from context
  const notes = this.context.Notes.map(note => note);
 //filter to match params - noteId
   const noteToDisplay = notes.filter(n => n.id === parseInt(this.props.match.params.noteId))

  
 
  const noteTitle = noteToDisplay.map(note => note.title)
  const noteContent = noteToDisplay.map(note => note.content)
  const noteFolder = noteToDisplay.map(note => note.folder)
  return (
    <div className="note-display">
      <FolderListNote Data={noteFolder}/>
      <article className='Note'>
        <h2>{noteTitle}</h2>
        {noteContent}
      </article>
    </div>
  )
}}