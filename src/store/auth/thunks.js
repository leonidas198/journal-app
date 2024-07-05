import { loginWithEmailPassword, logoutFirebase, registerUser, signInWhithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkinCredentials, login, logout } from "./authSlice"


/* export const checkinAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkinCredentials() );

    }
} */


export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        
        dispatch( checkinCredentials() );

        const result = await signInWhithGoogle();
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) )

    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {

        dispatch( checkinCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUser({ email, displayName, password });

        if ( !ok ) return dispatch( logout({ errorMessage} ) );

        dispatch( login({ uid, photoURL, displayName, email }) )
        

    }

}

export const startLoginWithEmailPassword = ({ email, password, displayName }) => {

    return async( dispatch ) => {
        dispatch( checkinCredentials() );

        const result = await loginWithEmailPassword({ email, password, displayName });

        //if ( !ok ) return dispatch( logout({ errorMessage }) )
        if ( !result.ok ) return dispatch( logout( result ) );

        dispatch( login(result) )
    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase() 
        dispatch( clearNotesLogout() );
        dispatch( logout() );
    }
}