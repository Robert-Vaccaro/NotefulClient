import Data from '../DummyStore'
import React from 'react'

const NoteContext = React.createContext({
    data: Data,
    folders:[],
    Notes:[],
    Delete: () => {

    },
    Push: () => {

    },
    CreateFolder: () => {

    }
})

export default NoteContext; 