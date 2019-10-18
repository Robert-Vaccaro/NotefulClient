import React,{Component} from 'react';
import Main from './Main/Main'
import Data from './DummyStore'
import {Route} from 'react-router-dom'
import Folder from './Folder/Folder'
import Notedisplay from './NoteDetails/Notedisplay'
import {Link} from 'react-router-dom'
import NoteContext from './DATA/NotefulContext'
import AddNote from './AddNote/AddNote';
import AddFolder from './AddFolder/AddFolder';
import config from './config';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      Data,
      folders:[],
      Notes:[],
      folderObject:[]
    }
  }


  componentDidMount(){
    
    //fetch request folders
    fetch(config.API_ENDPOINT_FOLDERS, {
      method:'GET',
      headers: {
        'content-type':'application/json',
        'Authorization': `${config.API_KEY}`
      }
    })
    .then(response => {
      if (!response.ok){
        return response.json().then(error => {
          throw error
        })
      }
      return response.json()
    })
    .then(data => {
      
  this.setState({folders:data})
  })
    .catch(error => {
      console.error(error)
    })
  //fetch request notes

  fetch(config.API_ENDPOINT_NOTES,{
    method:'GET',
    headers: {
      'content-type':'application/json',
      'Authorization': `${config.API_KEY}`
    }
  })
  .then(res => {
    if(!res.ok){
      return res.json().then(error =>{
        throw error
      })
    } return res.json()
  }).then(data => {
    this.setState({
      Notes:data
    })
  })
  .catch(error => {
    console.error(error)
  })
  
  }


  deletenote = noteToDelete => {

  const newData = this.state.Notes.filter(n =>
    n.id !== noteToDelete)

    this.setState({
      Notes:newData
    })

    
    
  }



  CreateFolder = NewFolder => {
  const NewObject = {
    title:NewFolder,
    date_created:"10/10/2019"
  }

  fetch(`${config.API_ENDPOINT_FOLDERS}`,{
    method:'POST',
    body:JSON.stringify(NewObject),
    headers: {
      'content-type':'application/json',
      'Authorization': `${config.API_KEY}`
    }
  })
  .then(res => {
    if(!res.ok){
      return res.json().then(error =>{
        throw error
      })
    } this.setState({
      folders: [...this.state.folders,NewObject]
      })
  })
  .catch(error => {
    console.error(error)
  })
  fetch(config.API_ENDPOINT_FOLDERS, {
    method:'GET',
    headers: {
      'content-type':'application/json',
      'Authorization': `${config.API_KEY}`
    }
  })
  .then(response => {
    if (!response.ok){
      return response.json().then(error => {
        throw error
      })
    }
    return response.json()
  })
  .then(data => {
  
this.setState({folders:data})
})
  .catch(error => {
    console.error(error)
  })


  }

  addNote = (Note,content,folder) => {
    
  
    fetch(config.API_ENDPOINT_NOTES,{
      headers: {
        'content-type':'application/json',
        'Authorization': `${config.API_KEY}`
      }
    })
    .then(res => {
      if(!res.ok){
        return res.json().then(error =>{
          throw error
        })
      } return res.json()
    }).then(data => {
      this.setState({
        Notes:data
      })
    })
    .catch(error => {
      console.error(error)
    })
  
    
  }
// returns a Header 
// Route to Component Folder - Folder page with same list of all folders but filtered notes based on folder-id. 
// Route to Notesdisplay Component - Note details and content + folder it belongs to and go back button
// Route to Main Component - Lists all notes and all folders
  render(){

    const contextValue = {
      data: this.state.Data,
      folders:this.state.folders,
      Notes: this.state.Notes,
      Delete: this.deletenote,
      Create: this.CreateFolder,
      addNote: this.addNote
    }
    return (
      <NoteContext.Provider value={contextValue}>
        <main className='App'>
          <header className="header-main"><Link className="home-link" to="/"><h1>Noteful</h1></Link></header>
          <Route path='/folder/:folderId' component={Folder}/>
          <Route path='/note/:noteId'component={Notedisplay}/>
          <Route exact path='/' component={Main}/>
          <Route path='/addnote' component={AddNote}/>
          <Route path='/addfolder' component={AddFolder}/>
        </main>
      </NoteContext.Provider>
    );
  }
}

export default App;