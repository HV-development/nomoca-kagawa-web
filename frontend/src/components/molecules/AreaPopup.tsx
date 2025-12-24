"use client"

import { AreaButton } from "@/components/atoms/AreaButton"
import { Button } from "@/components/atoms/Button"

interface AreaPopupProps {
  isOpen: boolean
  selectedAreas: string[]
  onAreaToggle: (area: string) => void
  onClose: () => void
  onClear: () => void
}

// データベースに保存されているエリア値と一致させる（日本語ラベルがそのまま保存されている）
const KAGAWA_AREAS = [
  { value: "高松市内エリア", label: "高松市内エリア" },
  { value: "東讃エリア", label: "東讃エリア" },
  { value: "中讃エリア", label: "中讃エリア" },
  { value: "西讃エリア", label: "西讃エリア" },
]

export function AreaPopup({ isOpen, selectedAreas, onAreaToggle, onClose, onClear }: AreaPopupProps) {
  if (!isOpen) return null

  return (
    <>
      {/* オーバーレイ */}
      <div className="fixed inset-0 bg-black bg-opacity-20 z-40" onClick={onClose}></div>

      {/* ポップアップ */}
      <div className="fixed inset-x-4 top-1/2 transform -translate-y-1/2 bg-white rounded-2xl shadow-xl z-50 max-w-sm mx-auto overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">エリアを選択</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
              aria-label="閉じる"
            >
              ✕
            </button>
          </div>

          {/* 説明テキスト */}
          <div className="text-sm text-gray-600 mb-4">
            香川県内のエリアを選択してください
          </div>

          {/* エリア選択グリッド - スマホ最適化 */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {KAGAWA_AREAS.map((area) => (
              <AreaButton
                key={area.value}
                label={area.label}
                isSelected={selectedAreas.includes(area.value)}
                onClick={() => onAreaToggle(area.value)}
                className="text-sm py-3 px-2 min-h-[44px] flex items-center justify-center w-full font-medium"
              />
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={onClear} variant="secondary" className="flex-1 py-3">
              クリア
            </Button>
            <Button onClick={onClose} className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white">
              完了（{selectedAreas.length}件選択）
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}