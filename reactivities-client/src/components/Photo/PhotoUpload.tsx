import React, { Fragment, useState } from 'react'
import { Grid, Header, Image } from 'semantic-ui-react'
import PhotoDropZone from './PhotoDropZone'

const PhotoUpload = () => {
    const [files, setFiles] = useState<any[]>([])
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 1 - Add Photo' />
                    <PhotoDropZone setFiles={setFiles} />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 2 - Resize Image' />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 3 - Preview & Upload' />
                    {(files.length > 0) && <Image src={files[0].preview} />}
                </Grid.Column>
            </Grid>
        </Fragment>
    )
}

export default PhotoUpload
