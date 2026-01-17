import { useEffect } from "react"
import { useStore } from "~/stores"

export function GoToTop() {
  const goToTop = useStore(state => state.goToTop)
  const setGoToTopEl = useStore(state => state.setGoToTopEl)

  useEffect(() => {
    setGoToTopEl(window.document.documentElement)
  }, [setGoToTopEl])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.document.documentElement.scrollTop || window.document.body.scrollTop
      const ok = scrollTop > 300
      useStore.setState((state) => {
        if (state.goToTop.ok !== ok) {
          return {
            goToTop: { ...state.goToTop, ok },
          }
        }
        return state
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (goToTop.ok && goToTop.el && goToTop.fn) {
      goToTop.el.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }, [goToTop.ok, goToTop.el, goToTop.fn])

  return null
}
