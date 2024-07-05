



export const fileUpload = async( file ) => {

    //if ( !file ) throw new Error('La imagen no exite');
    if ( !file ) return null;
 

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dhldko0qv/upload';

    const formData = new FormData();
    formData.append( 'upload_preset', 'journal-app' );
    formData.append( 'file', file );

    try {
        
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData,
        } );
        
        if ( !resp.ok ) throw new Error('La imagen no pudo ser cargada');

        const cloudResp = await resp.json();
        

        return cloudResp.secure_url;

    } catch (error) {
        //console.log(error)
        //throw new Error( error.message )
        return null;
    }
}