import React from 'react';

export default class Invoice extends React.Component {

    render() {
        return (
        <div style={{...styles.generalContainer, backgroundColor: (this.props.index%2 === 0) ? "white": "#f6f6f6"}}>
            <div style={{...styles.statColumn, width: "10%"}}>
                <div style={styles.statColumnInfo}>{this.props.invoice.folio}</div>
            </div>
            <div style={{...styles.statColumn, width: "10%"}}>
                <div style={styles.statColumnInfo}>{this.props.invoice.tipo}</div>
            </div>
            <div style={{...styles.statColumn, width: "30%"}}>
                <div style={styles.statColumnInfo}>{this.props.invoice.enteReceptor.razonSocial}</div>
            </div>
            <div style={{...styles.statColumn, width: "30%"}}>
                <div style={styles.statColumnInfo}>{this.props.invoice.fecha} ,   {this.props.invoice.hora} horas.</div>
            </div>
            <div style={{...styles.statColumn, width: "10%"}}>
                <div style={styles.statColumnInfo}>{this.props.invoice.montoTotal.toLocaleString()}</div>
            </div>
            <div style={{...styles.statColumn, width: "10%"}}>
                <div style={styles.statColumnInfo}>{this.props.invoice.ivaTotal.toLocaleString()}</div>
            </div>
        </div>
        )
    }
}

const styles = {
    generalContainer: {
        width: "80%",
        display: "flex",
        flexDirection: "row",
        margin: "auto",
        paddingTop: "20px",
        paddingBottom: "20px",
        fontFamily: "Ubuntu"
    },
    statColumn: {
        display: "flex",
        margin: "auto",
        flexDirection: "column",
    },
    statColumnTitle: {
        fontWeight: 500,
        paddingBottom: "10px"
    },
    statColumnInfo: {
        textAlign: "center"
    }

 
}