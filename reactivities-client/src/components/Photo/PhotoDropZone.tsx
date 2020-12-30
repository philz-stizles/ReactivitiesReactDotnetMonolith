import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react'

interface IProps {
    setFiles: (files: object[]) => void
}

const dropzoneStyle = {
    border: 'dashed 3px',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center' as 'center',
    height: '170px'
}

const dropzoneActiveStyle = {
    borderColor: 'green'
}

const PhotoDropZone: React.FC<IProps> = ({setFiles}) => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles)
        setFiles(acceptedFiles.map((file: object) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [setFiles])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    return (
        <div {...getRootProps()} style={(isDragActive) ? { ...dropzoneStyle, ...dropzoneActiveStyle } : dropzoneStyle }>
        <input {...getInputProps()} />
            <Icon name='upload' size='big' />
            <Header size='small' content='Drop image here'/>
        </div>
    )
}

export default PhotoDropZone