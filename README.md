# ABOUT THIS PROYECT

This proyect was developed in order to comply with the following *User Story*:

> As a company executive, I want to see a list of all the invoices I have sent to my customers ordered by emission dates descending, so that I have a clear understanding of my accounts receivable.

### TECHNOLOGIES USED.

To complete this proyect the following technologies were used:

- NodeJS, to create the script that scans XML files and and converts it to objects then uploaded to Firebase.
- JavaScript and React, to create the Front-End application that sorts and displays the information.
- Firebase, as the database that enables communication between the two processes.

# INSTALLATION AND USAGE

This proyects consists of two different sides to the software.

## First, obtaining information about the invoices:

To get information about the invoices one must run a specific script that scans a specific folder and extracts the information of the XML files it finds, *given that they follow a certain structure, indicated at the end of this README*, it then constructs an object with the information and uploads it to Firebase (google's database), where it can then be accessed by the Front-End side of this app.

To achieve the above stated one must:

1. Download/Clone this repository.
2. If you don't already have [Node](https://nodejs.org/en/) installed in you computer, download it and install it. 
3. Open the Terminal in the main proyect folder and run `npm install`.
4. Run the following command line `node .\xmlScript\index.js ../invoices`
> This command line executes the program (.\xmlScript\index.js) and tells it to scan the following folder (../invoices), **RELATIVE PATH from the folder the program is located in, in this case the xmlScript folder**. You could also tell the program to run on a different path, and it would scan the XML files in it, but those files **would have to have the same structure as those provided for this proyect** (see below). 

## Second, to display the data in the browser:

You have two choices:

1. Open the Terminal in the main proyect folder.
2. Run `npm start`.

-OR-

1. Click the following [link](https://raquelcc.github.io/desafio-penta).



# XML STRUCTURE OF FILES

```
<?xml version="1.0" encoding="utf-8"?> 
<dte emision="1559347200" tipo="factura" folio="1"> 
<emisor rut="111.111-6" razonSocial=“Company A" /> <receptor rut="222.222-1" razonSocial=“Company B" />
<items> 
<detalle monto="100" iva="19">Service </detalle> 
</items> 
</dte> 
```


