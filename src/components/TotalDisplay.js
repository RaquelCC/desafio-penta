import React from 'react';

export default class TotalDisplay extends React.Component {


    render() {
        return (
            <div>
            {this.props.montoTotal > 0 && <div style={styles.generalContainer}>
                <div style={styles.statContainer}>
                    <div>Total Montos:</div>
                    <div style={styles.statItem}>{this.props.montoTotal.toLocaleString()}</div>
                </div>
                <div style={styles.statContainer}>
                    <div>Total Iva:</div>
                    <div style={styles.statItem}>{this.props.ivaTotal.toLocaleString()}</div>
                </div>
            </div>}
            </div>
        )
    }

}

const styles = {
    generalContainer: {
        display: "flex",
        margin: "auto",
        marginRight: "10%",
        marginTop: "50px",
        width: "fit-content",
        flexDirection: "row",
        padding: "10px 20px",
        backgroundColor: "#f04e45",
        color: "#fff",
        fontWeight: 500,
    },
    statContainer: {
        padding: "5px 20px",
        margin: "auto"
    },
    statItem: {
        float: "right",
        fontWeight: 400
    }
}