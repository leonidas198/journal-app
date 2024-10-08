import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from '../components';
import { useForm } from '../../hooks/useForm';
import { setActiveNote, startDeletingNote, startSaveNotes, startUploadingFiles } from '../../store/journal';


export const NoteView = () => {

    const dispatch = useDispatch();

    const { activeNote, messageSaved, isSaving } = useSelector( state => state.journal );

    const { body, title, date, onInputChange, formState } = useForm( activeNote );

    //const zoneDate = 'America/Buenos_Aires';

    const dateString = useMemo( () => {
        const newDate = new Date( date ); 
        
        return newDate.toUTCString() 
    }, [date] );

    const fileInputRef = useRef();


    useEffect(() => {
        dispatch( setActiveNote( formState ) );      
    }, [formState])

    useEffect(() => {
        if ( messageSaved.length > 0 ) {
            Swal.fire( 'Nota actualizada', messageSaved, 'success' );
        }


    }, [ messageSaved ])
    

    
    const onSaveNote = () => {
        dispatch( startSaveNotes() );
    }

    const onFileInputChange = ( { target } ) => {
        if ( target.files === 0 ) return;
        
        dispatch( startUploadingFiles( target.files ) );
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }


  return (
    <Grid 
        container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' sx={{ mb: 1 }}
        className='animate__animated animate__fadeIn animate__faster'
    >
        <Grid item>
            <Typography fontSize={ 20 } fontWeight='light'>{ dateString }</Typography>

        </Grid>
        <Grid item>

            <input 
                ref={ fileInputRef }
                type='file'
                multiple
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />
            <IconButton
                color='primary'
                disabled={ isSaving }
                onClick={ () => fileInputRef.current.click() }
                
            >
                <UploadOutlined /> 
                <Typography>
                    Agrega imagenes
                </Typography>
            </IconButton>

            <Button
                disabled={ isSaving } 
                color="primary" 
                sx={{ p: 2 }}
                onClick={ onSaveNote }
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label="Titulo"
                sx={{ border: 'none', mb: 1}}
                name='title'
                value={ title }
                onChange={ onInputChange }
            />
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Que hiciste hoy?"
                minRows={ 5 }
                name='body'
                value={ body }
                onChange={ onInputChange }               
            />
        </Grid>

        <Grid container justifyContent="end">
            <Button
                onClick={ onDelete }
                sx={{ mt: 2 }}
                color='error'
            >
                <DeleteOutline/>
                Borrar Nota
            </Button>

        </Grid>

        <ImageGallery
            images={ activeNote.imageUrls }
        />

    </Grid>
  )
}
