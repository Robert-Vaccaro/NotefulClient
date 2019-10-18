import React from 'react';
import ReactDOM from 'react-dom';
import Note from './Note';
import {BrowserRouter} from 'react-router-dom'

const testnotes = [{
    content: "Assumenda blan",
    folderId: "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
    id: "d26e0980-ffaf-11e8-8eb2-f2801f1b9fd1",
    modified: "2018-03-03T00:00:00.000Z",
    name: "Tigers"
}]


it('renders without crashing', () => {
  
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter>
  <Note Note={testnotes}/></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});