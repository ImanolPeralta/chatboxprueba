import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


// Configuración de Multer

const storage = multer.diskStorage({
    // Ubicación de la ruta donde voy a persistir los archivos
    destination: function(req, file, cb) {
        cb(null, `${__dirname}/public/img`)
    },
    // Renombre de los archivos.
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

export const uploader = multer({
    storage,
    // si se genera algún error se captura
    onError: function(error, next) {
        console.log(error)
        next()
    }
})