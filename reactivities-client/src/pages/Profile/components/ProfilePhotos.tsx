import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Tab, Header, Card, Image, Button, Grid } from 'semantic-ui-react'
import PhotoUpload from '../../../components/Photo/PhotoUpload'
import { RootStoreContext } from '../../../data/mobx/rootStore'

const ProfilePhotos = () => {
    const { profileStore } = useContext(RootStoreContext)
    const { profile, isLoggedInUser, deletePhoto } = profileStore
    const [addPhotoMode, setAddPhotoMode] = useState(true)
    
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{ paddingBottom: 0}}>
                    <Header floated='left' icon='image' content='Photos'/>
                    { isLoggedInUser && <Button 
                        floated='right' basic 
                        content={(addPhotoMode) ? 'Cancel' : 'Add Photo'} 
                        onClick={() => (addPhotoMode) ? setAddPhotoMode(false) : setAddPhotoMode(true)}/>}
                </Grid.Column>
                <Grid.Column width={16}>
                    {   (addPhotoMode) && isLoggedInUser
                        ? (
                            <PhotoUpload />
                        )
                        : (
                            <Card.Group itemsPerRow={5}>
                                {profile && profile.photos.map(photo => {
                                    return (
                                        <Card key={photo.id}>
                                            <Image src={photo.url}/>
                                            { isLoggedInUser && <Button.Group fluid widths={2}>
                                                    <Button basic content='Main' onClick={() => setAddPhotoMode(false) }/>
                                                    <Button basic icon='trash' onClick={() => deletePhoto(photo.id) }/>
                                                </Button.Group> 
                                            }
                                        </Card>
                                    )
                                })}
                            </Card.Group>
                        )
                    }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default observer(ProfilePhotos)
