import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
    cloud_name: 'dhldko0qv',
    api_key: '867334222117332',
    api_secret: 't99VMWhG0Q0ioAbSeJT3RN8HFEo',
    secure: true,
});


describe('pruebas en fileUpload', () => {

    test('debe subir el archivo correctamente a cloudinary', async() => {

        const imageUrl = 'https://www.shutterstock.com/image-illustration/fantasy-night-landscape-city-lights-260nw-2313806417.jpg';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([ blob ], 'foto.jpg');
        
        const url = await fileUpload( file );
        expect( typeof url ). toBe( 'string' );

        //console.log(url);
        const segments = url.split( '/' );
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');

        await cloudinary.api.delete_resources([ imageId ]);
        


    });

    test('debe retornar null', async() => {

        const file = new File([ ], 'foto.jpg');
        
        const url = await fileUpload( file );
        expect( url ). toBe( null );
      
    })
    
    
  
})
