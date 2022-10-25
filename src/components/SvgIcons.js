import React from 'react';

function WaveIcon({className}){
    const {ReactComponent:Svg} = require('../assets/images/icons/wave-2.svg')
    return(
        <Svg className={className}/>
    )
}
export {
    WaveIcon

}
