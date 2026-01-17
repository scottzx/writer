import type { FixedColumnID } from "@shared/types"
import { useEffect } from "react"
import { useTitle } from "react-use"
import { metadata } from "@shared/metadata"
import { NavBar } from "../navbar"
import { Dnd } from "./dnd"
import { useStore } from "~/stores"

export function Column({ id }: { id: FixedColumnID }) {
  const currentColumnID = useStore(state => state.currentColumnID)
  const setCurrentColumnID = useStore(state => state.setCurrentColumnID)

  useEffect(() => {
    setCurrentColumnID(id)
  }, [id, setCurrentColumnID])

  useTitle(`NewsNow | ${metadata[id].name}`)

  return (
    <>
      <div className="flex justify-center md:hidden mb-6">
        <NavBar />
      </div>
      {id === currentColumnID && <Dnd />}
    </>
  )
}
