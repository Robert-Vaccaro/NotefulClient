import React,{Component} from 'react'
import NoteContext from '../DATA/NotefulContext'
import ValidationError from '../ValidationError/ValidationError'
import config from '../config'

export default class AddNote extends Component {
    
    static contextType = NoteContext

    constructor(props){
        super(props);
        this.Input = React.createRef();
        this.content = React.createRef();
        this.folder = React.createRef();
        this.state = {
            nametouched: false,
            name: "",
        }
    }


    handleSubmit(event){
        event.preventDefault();

        const NoteObject = {
            title: this.state.name,
            content: this.content.current.value,
            folder: parseInt(this.folder.current.value),
            date_published: '2018-08-13T23:00:00.000Z'
          }
       
          
          fetch(`${config.API_ENDPOINT_NOTES}`,{
            method:'POST',
            body:JSON.stringify(NoteObject),
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
                       }
              const content = this.content.current.value;
              const folder = this.folder.current.value;
              this.context.addNote(this.state.name,content,folder);
              this.props.history.push('/')
              
            
            })
          .catch(error => {
            console.error(error)
          })
       
    }


    validateName(){
        const name = this.state.name.trim();
        if (name.length === 0){
            return "Name is required"
        }
    }

    updateName(name){
        this.setState({
            name: name,
            touched:true,
        })
    }

    render(){
        const nameError = this.validateName();
        const options = this.context.folders.map(f => {
            return <option key={f.id} value={f.id}>{f.title}</option>
        })
       
    return(
        <div className="addnoteform">
            <form onSubmit={e => this.handleSubmit(e)}>
            <legend className="addnotetitle">Add Note</legend>
                <label className="labels" htmlFor="addName">Name</label>
                    <input className="addnoteinputs"type="text" name="addName" id="addName" onChange={e => this.updateName(e.target.value)}/>
                    {this.state.touched && (<ValidationError message={nameError}/>)}
                <label className="labels"htmlFor="addContent">Content</label>
                    <input className="addnoteinputs"  type="text" name="addContent" id="addContent" ref={this.content}/>
                <label className="labels" htmlFor="addNote">Folder</label>
                    <select className="addnoteinputs" ref={this.folder} >
                        {options}
                    </select>
            
                <button className="addNote" disabled={this.validateName()}>Add</button>
            
            </form>
            <button className="back-button" id="backbuttonnote" onClick={() => this.props.history.goBack()}>Back</button>
        </div>
    )
  
}
}