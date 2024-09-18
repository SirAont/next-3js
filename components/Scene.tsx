'use client'

import { Canvas } from '@react-three/fiber'
import React from 'react'
import Model from './Model'

export default function Scene() {
    return (
      <div className='w-full h-full m-10'>
        <Canvas>
          <Model />
        </Canvas>
      </div>
    )
}