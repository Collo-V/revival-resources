import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";

function Stars({rating}) {
    rating = rating??0
    let whole,dec,hasHalf
    whole  = Math.trunc(rating)
    dec = rating-whole
    if(dec>=0.4 && dec<=0.6){
        hasHalf = true
    } else if(dec>0.6){
        whole+=1
    }
    const numbers = [1, 2, 3, 4, 5];
    return (
        <span className='flex'>
            {
                numbers.map(number=>(
                    <span key={number}>
                        {   number ===whole+1 && hasHalf?
                            <FontAwesomeIcon icon={solid('star-half-stroke')} className='text-yellow-300'/>
                            :  number >= whole+1?
                            <FontAwesomeIcon icon={regular('star')} className='text-yellow-300'/>
                                :
                            <FontAwesomeIcon icon={solid('star')} className='text-yellow-300'/>
                        }
                    </span>
                ))
            }
        </span>
    );
}

export default Stars;
