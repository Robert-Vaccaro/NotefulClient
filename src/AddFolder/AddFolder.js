import React,{Component} from 'react'
import NoteContext from '../DATA/NotefulContext'
import ValidationError from '../ValidationError/ValidationError'

export default class AddFolder extends Component {
    
    static contextType = NoteContext

    constructor(props){
        super(props);
        this.Input = React.createRef();
        this.state = {
            NameofFolder: "",
        }
    }


    handleSubmit(event){
        event.preventDefault();
        const inputvalue = this.Input.current.value;
      
        this.context.Create(inputvalue)
        this.props.history.push('/')    
    }

    validateName(){
        
        const name = this.state.NameofFolder.trim();
       const folders = this.context.folders.map(f => f.name)
       const boolean = folders.find(f => f === name);
        if (name.length === 0){
            return "Name is required"
        } else if (boolean){
            return "You've already used that name"
        }
    }
updateName(name){
    this.setState({
        NameofFolder:name,
        touched:true,
    })
}


    render(){
        const nameError = this.validateName();
        return(
            <div className="Add-folder-page">
            <form className="addFolderform" onSubmit={e => this.handleSubmit(e)}>
                <label className="addFoldertitle"htmlFor="addfolder">Add Folder</label>
                <input onChange={e => this.updateName(e.target.value)} type="text" name="addfolder" id="addfolder" ref={this.Input}/>
                <button disabled={this.validateName()} className="addFolder">Add</button>
                {this.state.touched && (<ValidationError message={nameError}/>)}
               
            </form>
            <button className="back-button" onClick={() => this.props.history.goBack()}>Back</button>
          
            </div>
            )
            }
}