import React, {Component} from 'react';
import FolderList from '../FolderList/FoldersList';
import NoteSpecific from '../FilteredNotes/NoteSpecific'
import NotefulContext from '../DATA/NotefulContext'
import PropTypes from 'prop-types'
import Error from '../ErrorBoundary/ErrorBoundary'

export default class Folder extends Component {
  static contextType = NotefulContext

render(){

  //Filters notes based upon folderId

    const note = this.context.Notes.filter(n => n.folder === parseInt(this.props.match.params.folderId))

// Returns two components Folder List and NoteSpecific(sends filtered notes as 'notesdata')
    return (

    <main className='main-page'>
        <div className="container">
          <section className="sidebar-main">
            <FolderList/>
            </section>
          <main className="main-main">
            <Error>
              <NoteSpecific notesdata={note}/>
            </Error>
          </main>
        </div>
    </main>
  );
    }
  }

  NoteSpecific.propTypes = {
    Data:PropTypes.array
  }
