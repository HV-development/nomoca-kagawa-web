/**
 * エリア値からエリア名へのマッピング
 * 香川県のエリアを定義
 */

const AREA_TO_CITY_MAP: Record<string, string> = {
  takamatsu: "高松市内エリア",
  tosan: "東讃エリア",
  chusan: "中讃エリア",
  seisan: "西讃エリア",
}

/**
 * エリア値の配列をエリア名の配列に変換
 * @param areaValues エリア値の配列（例: ["takamatsu", "tosan"]）
 * @returns エリア名の配列（例: ["高松市内エリア", "東讃エリア"]）
 */
export function mapAreasToCities(areaValues: string[]): string[] {
  return areaValues
    .map(area => AREA_TO_CITY_MAP[area])
    .filter((city): city is string => city !== undefined)
}

/**
 * 単一のエリア値をエリア名に変換
 * @param areaValue エリア値（例: "takamatsu"）
 * @returns エリア名（例: "高松市内エリア"）、存在しない場合はundefined
 */
export function mapAreaToCity(areaValue: string): string | undefined {
  return AREA_TO_CITY_MAP[areaValue]
}

/**
 * エリア値が有効かどうかをチェック
 * @param areaValue エリア値
 * @returns 有効なエリア値かどうか
 */
export function isValidArea(areaValue: string): boolean {
  return areaValue in AREA_TO_CITY_MAP
}

