import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { objectValues } from 'react-toastify/dist/utils'

interface IProps {
    setFiles: (files: object[]) => void
}

const PhotoDropZone: React.FC<IProps> = ({setFiles}) => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles)
        setFiles(acceptedFiles.map((file: object) => Object.assign(file, {})))
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    return (
        <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
            isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
        </div>
    )
}

export default PhotoDropZone