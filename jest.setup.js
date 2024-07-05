// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // npm i whatwg-fetch
//import 'setinmediate';




require('dotenv').config({
    path: '.env.test'
});

jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({ ...process.env })
}));