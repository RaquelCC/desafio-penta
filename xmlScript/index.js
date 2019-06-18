const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const database = require('./firebase');

const parser = new xml2js.Parser();

const userPath = process.argv[2];

let fileCount = 0;

console.log("Cargando archivos XML a Firebase..");
database.ref().set({}, () => {
    fs.readdir(path.resolve(path.dirname(require.main.filename), userPath), (err, files) => {
        if (err) {
            return console.log(err);
        } else {
            // console.log(files)
            xmlFiles = files.filter(file => {
                return (file.indexOf(".xml") !== -1)
            })
            xmlFiles.forEach(file => {
                fileCount++;
                // console.log(file)
                fs.readFile(path.resolve(path.dirname(require.main.filename), userPath, file), (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log(data)
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
                                // console.log(invoice)

                                database.ref().push(invoice, () => {
                                    if (xmlFiles.length === fileCount) {
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
    // process.exit();
})
