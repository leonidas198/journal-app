import { useDispatch, useSelector } from 'react-redux';
import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { JornalLayaout } from '../layout/JornalLayaout';
import { NoteView, NothingSelectedView } from '../views';
import { startNewNote } from '../../store/journal';


export const JournalPage = () => {

  const dispatch = useDispatch();

  const { isSaving, activeNote } = useSelector( state => state.journal )

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JornalLayaout>

      
      {
        ( !activeNote )
        ? <NothingSelectedView/>
        : <NoteView />
      }
      
      <IconButton
        onClick={ onClickNewNote }
        size='large'
        disabled={ isSaving }
        sx={{ 
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.5 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}  
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>

      
    </JornalLayaout>
  )
}
