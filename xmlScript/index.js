const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const database = require('./firebase');

const parser = new xml2js.Parser();

const userPath = process.argv[2];

let fileCount = 0;

console.log("Cargando archivos XML a Firebase..");
// inicializa firebase con un objeto vacio
database.ref().set({}, () => {
    // extrae nombres de archivos contenidos en la carpeta indicada por el usuario
    fs.readdir(path.resolve(path.dirname(require.main.filename), userPath), (err, files) => {
        if (err) {
            return console.log(err);
        } else {
            // filtra archivos .xml
            xmlFiles = files.filter(file => {
                return (file.indexOf(".xml") !== -1)
            })
            // por cada archivo extrae la data y la estructura
            xmlFiles.forEach(file => {
                fileCount++;
                fs.readFile(path.resolve(path.dirname(require.main.filename), userPath, file), (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        parser.parseString(data, function (err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                const invoice = {
                                    fechaEmision: result.dte.$.emision,
                                    tipo: result.dte.$.tipo,
                                    folio: result.dte.$.folio,
                                    enteEmisor: {
                                        rut: result.dte.emisor[0].$.rut,
                                        razonSocial: result.dte.emisor[0].$.razonSocial
                                    },
                                    enteReceptor: {
                                        rut: result.dte.receptor[0].$.rut,
                                        razonSocial: result.dte.receptor[0].$.razonSocial
                                    },
                                    detalle: []
                                };

                                let montoTotal = 0;
                                let ivaTotal = 0;

                                result.dte.items[0].detalle.forEach(item => {
                                    montoTotal += Number(item.$.monto);
                                    ivaTotal += Number(item.$.iva);
                                    const producto = {
                                        nombreProducto: item._,
                                        monto: item.$.monto,
                                        iva: item.$.iva,
                                    }
                                    invoice.detalle.push(producto)
                                });

                                invoice.montoTotal = montoTotal;
                                invoice.ivaTotal = ivaTotal;

                                const date = new Date();
                                date.setTime(invoice.fechaEmision);

                                invoice.fecha = `${date.getDate()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
                                invoice.hora = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;

                                //envía el objeto creado a firebase
                                database.ref().push(invoice, () => {
                                    if (xmlFiles.length === fileCount) {
                                        // si el objeto enviado es el último, termina el programa
                                        process.exit();
                                    }
                                })

                            }
                        });
                    }
                })
            })
        }

    })
})
