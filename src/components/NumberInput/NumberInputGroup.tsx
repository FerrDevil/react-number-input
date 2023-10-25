"use client"

import { useEffect, useState } from "react"
import NumberInput from "./NumberInput"
import styles from "./styles.module.css"
import { INumberInputGroup } from "./types"

export default function NumberInputGroup({numberInputsParams, onChange} : INumberInputGroup){

    const [inputValue, setInputValue] = useState<number[]>(
        typeof numberInputsParams === "number" ?
            Array.from(Array(numberInputsParams).keys()).map(() => 0)
        : 
            numberInputsParams.map(params => params?.defaultNumber ? params.defaultNumber: 0)
        )


    useEffect(() => {
        onChange && onChange(inputValue)
    }, [inputValue])
    return(
        <div className={styles.number_inputs_group}>
            {
                typeof numberInputsParams === "number" ? 
                    Array.from(Array(numberInputsParams).keys()).map((num, index) => (
                        <NumberInput key={num}
                            onChange={(value) => {
                                
                                setInputValue(prev => prev.map((numValue, numIndex) => index===numIndex? value : numValue))
                            }}
                        />
                    ))
                :
                    numberInputsParams.map((params, index) => (
                        <NumberInput key={index} {...params}
                            onChange={(value) => {
                                setInputValue(prev => prev.map((numValue, numIndex) => index===numIndex? value : numValue))
                            }}
                        />
                    ))
            }
            
        </div>
    )
}