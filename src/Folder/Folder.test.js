import React from 'react';
import ReactDOM from 'react-dom';
import Folder from './Folder';
import {BrowserRouter} from 'react-router-dom'

it('renders without crashing', () => {
  
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Folder/></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});