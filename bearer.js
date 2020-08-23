import React, { Component } from 'react';
import TcgPlayer from './TcgPlayer.js';

class Bearer extends Component{
        state = {
            bearer: "Bearer M0Ski8PHpJsxHoEN8bqVCE7Pqc90lJQfllua2Vs2pOSzYdNdDf8Z2lQbQ0Elj4ovzuBLpxY-rh9v9WWdCWPGtRyCdXCRhnaVt0fCStWYwsfn6FDFOJNcyY05Dg3cuustoRFMnjRn2WenWsHZCSF0F-KYOfA0xsp-Ws89Ym82kTTY1m3MSeicETA8cEcPl4xueotpHdyjHnBBrNrrPk5J0dOnZcqHj-d4nx1PYoJizPjie0peq9flxp-KFPUYlrn1VB3uA02L0Nj3TbvvjFh0W4qAEJyk7Sskh9L4vIaagKQ8DtPkT4c69zqIr3a6XVhAL5E3jA"
        }
    componentDidMount(){
       this.supplyBearer()
    }

    supplyBearer(){
        console.log('bearerComp', this.state.bearer)
        this.props.receiveBearer(this.state.bearer)
        // this._a.receiveBearer(this.state.bearer)
    }
    render(){
        return(
            null
            // <TcgPlayer ref={ref => (this._a = ref)} />
        )
    }
}
export default Bearer

