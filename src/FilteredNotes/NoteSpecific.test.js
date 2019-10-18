import React from 'react';
import ReactDOM from 'react-dom';
import NoteSpecific from './NoteSpecific';
import {Link} from 'react-router-dom'
import {Router} from 'react-router-dom'
import {BrowserRouter} from 'react-router-dom'

const testnotedata = [
    {
        content: "This is my note",
        folderId: "bgjdakjgdkajjg",
        id:"nidngiadnigdnaign",
        modified: "2018-08-13T23:00:00.000Z",
        name: 'note',
    }
]

it('renders without crashing', () => {
  
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><NoteSpecific notesdata={testnotedata}/></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});