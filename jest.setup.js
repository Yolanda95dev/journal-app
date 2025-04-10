// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import { TextEncoder, TextDecoder } from 'util';


// eslint-disable-next-line no-undef
Object.assign(global, { TextDecoder, TextEncoder });