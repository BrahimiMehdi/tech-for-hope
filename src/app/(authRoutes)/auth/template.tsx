"use client"
import {motion} from "framer-motion"
import React from 'react'

type Props = {
    children:React.ReactNode
}

const template = ({children}: Props) => {
  return (
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4}}>
        {children}
    </motion.div>
  )
}

export default template