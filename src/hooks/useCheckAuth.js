import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";

import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal/thunks";



export const useCheckAuth = () => {

    const { status } = useSelector( state => state.auth );

    const dispacht = useDispatch()
  
    useEffect(() => {
      
      onAuthStateChanged( FirebaseAuth, async( user ) => {
        if ( !user  ) return dispacht( logout() );
  
        const { uid, email, displayName, photoURL } = user;
        dispacht( login({ uid, email, displayName, photoURL }) );
        dispacht( startLoadingNotes() )
      } )
  
    }, [])

    return status;
    
}
