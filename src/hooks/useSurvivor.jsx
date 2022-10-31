import { useEffect, useState } from "react";
import { useMoveSurvivor } from "./useMoveSurvivor";

export function useSurvivor(board, initialSurvivor) {
  const [survivor, setSurvivor] = useState(initialSurvivor)
  const [position, moveSurvivor] = useMoveSurvivor(board)

  useEffect(() => {
    setSurvivor({ ...survivor, position: position })
  }, [position])

  return [survivor, setSurvivor, moveSurvivor]
}