

import { loginWithEmailPassword, logoutFirebase, signInWhithGoogle } from '../../../src/firebase/providers';
import { checkinCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { checkinAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';


jest.mock('../../../src/firebase/providers');

describe('pruebas en thunks', () => {
    
    const dispatch = jest.fn()
    
    beforeEach( () => jest.clearAllMocks() );
    
    test('debe llamar el checkinCredentials', async() => {
        
        await checkinAuthentication()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkinCredentials() )

    });

    test('startGoogleSignIn debe llamar checkinCredentials y login', async() => {
        
        const loginData = { ok: true, ...demoUser };
        await signInWhithGoogle.mockResolvedValue( loginData );
        
        await startGoogleSignIn()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkinCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startGoogleSignIn debe llamar checkinCredentials y logout', async() => {
        
        const loginData = { ok: false, errorMessage: 'Error catastrofico' };
        await signInWhithGoogle.mockResolvedValue( loginData );
        
        await startGoogleSignIn()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkinCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

    });

    test('startLoginWithEmailPassword debe llamar checkinCredentials y login', async() => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword( formData )( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkinCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

        
    });

    test('startLogout debe llamar logoutFirebase,  clearNotes y Logout', async() => {
        
        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );


    });
    
    
    
    

})
