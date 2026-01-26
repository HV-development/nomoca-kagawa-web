'use client'

import { useEffect } from 'react'

/**
 * LP配下のみ、LP用スタイルを html/body に適用するためのクラス制御。
 * /lp から離れたらクラスを外すので、ユーザー画面はスマホ幅固定（globals.css）に戻る。
 */
export function LpLayoutController() {
  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    html.classList.add('lp-layout')
    body.classList.add('lp-layout')

    return () => {
      html.classList.remove('lp-layout')
      body.classList.remove('lp-layout')
    }
  }, [])

  return null
}


