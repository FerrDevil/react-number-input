"use client"

import { useState } from 'react'
import styles from './page.module.css'
import NumberInputGroup from '@/components/NumberInput/NumberInputGroup'

export default function Home() {
  const [state, setState] = useState<number[]>([0])
  return (
    <main className={styles.main}>
      <input value={state.join("")} readOnly/>
      <NumberInputGroup onChange={(value) => {setState(value)}} numberInputsParams={[{}, {}, {}]}/>
    </main>
  )
}
