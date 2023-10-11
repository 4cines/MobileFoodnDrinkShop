// const Client = require('ftp');
// const path = require('path');
// const fs = require('fs');
// const fsExtra = require('fs-extra');

// const ftpFile = (idProduct) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const ftpConfig = {
//         host: 'example.fpclient',
//         port: 21,
//         user: 'user',
//         password: 'pass#5a12',
//         secure: false
//       };

//       const baseDir = path.resolve(__dirname, '..');
//       const filePath = path.join(baseDir, 'uploads', `${idProduct}.pdf`);

//       // Create an empty file variable to be used later
//       let file = undefined;

//       const client = new Client();

//       client.on('ready', () => {
//         console.log('Conexión FTP establecida');

//         // Verificar si el archivo ya existe
//         if (fsExtra.existsSync(filePath)) {
//           // Eliminar el archivo existente
//           fsExtra.removeSync(filePath);
//           console.log('Archivo existente eliminado');
//         }

//         client.get(`${idProduct}.pdf`, (err, stream) => {
//           if (err) {
//             console.error('Error al descargar el archivo:', err);
//             client.end();
//             resolve(file);
//             return;
//           }
//           const writeStream = fs.createWriteStream(filePath);
//           stream.pipe(writeStream);

//           writeStream.on('finish', () => {
//             console.log('Archivo guardado correctamente');
//             client.end();
//             // Set the 'file' variable to the file path once it is saved
//             file = filePath;

//             resolve(file); // Resolve the Promise with the 'file' value
//           });

//           stream.once('close', () => {
//             client.end();
//           });
//         });
//       });

//       client.connect(ftpConfig);
//     } catch (err) {
//       console.log(err);
//       resolve(file);
//     }
//   });
// };

// module.exports = ftpFile;
