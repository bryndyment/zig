'use client'

import HomePage from '@/app/page'
import { BOARDS } from '@/util/boards'
import { notFound } from 'next/navigation'
import { FC, ReactNode, use, useEffect, useState } from 'react'

// types

type _SharedPageProps = { params: Promise<{ id: string }> }

// components

const SharedPage: FC<_SharedPageProps> = ({ params }) => {
  const { id: urlId } = use(params)
  const [render, setRender] = useState<ReactNode>(null)

  useEffect(() => {
    const id = Number(urlId)

    const index = BOARDS.findIndex(board => board.id === id)

    if (index === -1) {
      setRender(notFound())

      return
    }

    setRender(<HomePage id={id} />)
  }, [urlId])

  return render
}

export default SharedPage
