import { useEffect, useState } from "react";
import { useMoveSurvivor } from "./useMoveSurvivor";

export function useSurvivor(board) {
  const [survivor, setSurvivor] = useState()
  const [position, moveSurvivor] = useMoveSurvivor(board)

  useEffect(() => {
    setSurvivor({ ...survivor, position: position })
  }, [position])

  return [survivor, setSurvivor, moveSurvivor]
}