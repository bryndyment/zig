'use client'

import HomePage from '@/app/page'
import { useAppContext } from '@/comp/appContext'
import { BOARDS } from '@/util/const'
import { notFound } from 'next/navigation'
import { FC, ReactNode, use, useEffect, useState } from 'react'

// types

type _SharedPageProps = { params: Promise<{ id: string }> }

// components

const SharedPage: FC<_SharedPageProps> = ({ params }) => {
  const { id } = use(params)
  const { setPuzzleIndex } = useAppContext()
  const [component, setComponent] = useState<ReactNode>(null)

  useEffect(() => {
    const foundIndex = BOARDS.findIndex(board => board.id === Number(id))

    if (foundIndex === -1) {
      setComponent(notFound())
      return
    }

    setPuzzleIndex(foundIndex)
    setComponent(<HomePage />)
  }, [id, setPuzzleIndex])

  return component
}

export default SharedPage
