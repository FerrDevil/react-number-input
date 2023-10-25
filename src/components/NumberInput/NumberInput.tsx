"use client"
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { INumberInput } from './types'

export default function NumberInput({min=0, max=9, defaultNumber=0, onChange, } : INumberInput){

    const numberInputs = Array.from(Array(max+1).keys()).sort(num => num - min)
    const numberInputsForUser = [numberInputs[numberInputs.length-1], ...numberInputs, numberInputs[0]]
    const [currentNumberIndex, setCurrentNumberIndex] = useState(numberInputs.findIndex((element) => element === defaultNumber) + 1)

    const numberContentRef = useRef<HTMLDivElement | null>(null)
    

    const handlePreviousNumber = () => {
        numberContentRef?.current && (numberContentRef.current.style.transitionDuration = "0.2s")
        if (currentNumberIndex > 0 ){
            setCurrentNumberIndex(prev => prev - 1)
            
        }
    }

    const handleNextNumber = () => {
        numberContentRef?.current && (numberContentRef.current.style.transitionDuration = "0.2s")
        if (currentNumberIndex + 1 < numberInputsForUser.length ){
            setCurrentNumberIndex(prev => prev + 1)
        }
        
    }

    useEffect(() => {
        onChange && onChange(numberInputsForUser[currentNumberIndex])
    }, [currentNumberIndex])


    useEffect(() => {

        const handleTransition = () => {
            if (currentNumberIndex === 0 ){
                numberContentRef?.current && (numberContentRef.current.style.transitionDuration = "0s")
                setCurrentNumberIndex(numberInputsForUser.length-2)
            }
            if (currentNumberIndex + 1 === numberInputsForUser.length ){
                numberContentRef?.current && (numberContentRef.current.style.transitionDuration = "0s")
                setCurrentNumberIndex(1)
            }
        }
        numberContentRef?.current  && numberContentRef?.current?.addEventListener("transitionend", handleTransition)

        return () => {
            numberContentRef?.current  && numberContentRef?.current?.removeEventListener("transitionend", handleTransition)
        }
    }, [currentNumberIndex])

    return(
        <div className={styles.number_input_wrapper} >
            <button className={styles.number_input__arrow} data-direction="up" onClick={handlePreviousNumber}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-424-56-56 280-280 280 280-56 56-224-223-224 223Z"/></svg>
            </button>
            <div className={styles.number_input__container}>
                <div ref={numberContentRef} className={styles.number_input__content} style={{transform: `translateY(-${currentNumberIndex * 100}%)`, transition: "transform 0.2s"}}>
                    {
                        numberInputsForUser.map((num, numIndex) => 
                            (
                                <span key={numIndex } className={styles.number_toggle__number}> 
                                    {num}
                                </span>
                            )
                        )
                    }
                </div>
            </div>
            <button className={styles.number_input__arrow} data-direction="down" onClick={handleNextNumber}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
            </button>
        </div>
    )
}