// const Client = require('ftp');
// const path = require('path');
// const fs = require('fs');
// const fsExtra = require('fs-extra');
// const selectSignatureQuery = require('../db/queries/order/selectSignatureQuery');
// const {generateError} = require('../helpers');

// const ftpSignature = async (alb_gesco) => {
//   const ftpConfig = {
//     host: 'example.ftpclient',
//     port: 21,
//     user: 'example',
//     password: 'pass1234',
//     secure: false
//   };

//   const signatureData = await selectSignatureQuery(alb_gesco);

//   if(signatureData.length === 0) {
//     generateError("No existe número de albarán gesco", 404);
//   }

//   const filename = signatureData[0]?.firma;

//   const client = new Client();

//   client.on('ready', () => {
//     console.log('Conexión FTP establecida');

//     const baseDir = path.resolve(__dirname, '..');
//     const filePath = path.join(baseDir, 'uploads', 'signatures', filename);

//     client.get(filename, (err, stream) => {
//       if (err) {
//         console.log(`El archivo "${filename}" no existe en el servidor FTP.`);
//         client.end();
//         return;
//       }

//       // Si el archivo existe, se ejecutará este bloque
//       console.log(`El archivo "${filename}" existe en el servidor FTP.`);

//       // Si deseas guardar el archivo en el servidor local
//       const writeStream = fs.createWriteStream(filePath);
//       stream.pipe(writeStream);

//       writeStream.on('finish', () => {
//         console.log('Archivo guardado correctamente');
//         client.end();
//       });

//       stream.once('close', () => {
//         client.end();
//       });
//     });
//   });

//   client.connect(ftpConfig);
// };

// module.exports = ftpSignature;
