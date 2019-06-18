import React from 'react';
import { database } from './provider/firebase';
import './App.css';
import Invoice from './components/Invoice';
import TotalDisplay from './components/TotalDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      montoTotal: 0,
      ivaTotal: 0,
    }

  }

  componentDidMount() {
    database.ref().once("value", snap => {
      const newInvoices = Object.values(snap.val());
      newInvoices.sort((a,b) => {
        return (b.fechaEmision-a.fechaEmision)
      })

      const montoTotal = newInvoices.reduce((acc, current) => {
        return acc+current.montoTotal;
      }, 0);

      const ivaTotal = newInvoices.reduce((acc, current) => {
        return acc+current.ivaTotal;
      }, 0)
      this.setState({
        ...this.state,
        invoices: newInvoices,
        montoTotal: montoTotal,
        ivaTotal: ivaTotal
      });
    });
  }

  
  renderInvoices() {
    const invoices = this.state.invoices.map((item, i) => {
      return <Invoice invoice={item} index={i} key={i}/>
    });
    return invoices;
  }

  render() {
    return (
      <div style={styles.generalContainer}>
        <div style={styles.header}>Información de Documentos Tributarios</div>
        <div style={styles.tableHeader}>
          <div style={{...styles.tableTitle, width: "10%"}}>Folio</div>
          <div style={{...styles.tableTitle, width: "10%"}}>Tipo</div>
          <div style={{...styles.tableTitle, width: "30%"}}>Empresa Receptora</div>
          <div style={{...styles.tableTitle, width: "30%"}}>Fecha (dd-mm-aaaa, hh:mm)</div>
          <div style={{...styles.tableTitle, width: "10%"}}>Monto</div>
          <div style={{...styles.tableTitle, width: "10%"}}>Iva</div>
        </div>
        {this.renderInvoices()}
        <TotalDisplay montoTotal={this.state.montoTotal} ivaTotal={this.state.ivaTotal}/>
      </div>
    )
  }

  
}

const styles = {
  generalContainer: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: "50px"
  },
  header: {
    height: "80px",
    width: "100%",
    marginTop: 0,
    textAlign: "center",
    lineHeight: "80px",
    backgroundColor: "#45555f",
    color: "#fff",
    font: "Ubuntu",
    fontSize: "30px",
    marginBottom: "50px"
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    height: "30px",
    width: "80%",
    lineHeight: "30px",
    margin: "auto",
    marginBottom: 0,
    backgroundColor: "#f04e45",
    color: "#fff",
    textAlign: "center"

  },
  tableTitle: {
    border: "#fff 0.3px solid"
  }
}

export default App;
