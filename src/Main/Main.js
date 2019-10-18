import React, {Component} from 'react';
import FolderList from '../FolderList/FoldersList'
import Note from '../Note/Note'
import NotefulContext from '../DATA/NotefulContext'





class Main extends Component {
  
  static contextType = NotefulContext 
  
  render(){

    return (
    <main className='main-page'> 
        <div className="container">
        <section className="sidebar-main">
          <FolderList/>
        </section>
        <main className="main-main">
          <Note/>
        
        </main>
        
        </div>
    </main>
  );
    }
}

export default Main;