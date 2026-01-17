import { useEffect, useState } from "react"

interface Heading {
  id: string
  text: string
  level: number
}

export function DocumentOutline({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    // 从 HTML 中提取标题
    if (typeof window === "undefined") return

    const parser = new DOMParser()
    const doc = parser.parseFromString(content, "text/html")
    const headingElements = doc.querySelectorAll("h1, h2, h3")

    const extractedHeadings: Heading[] = Array.from(headingElements).map((h, i) => ({
      id: `heading-${i}`,
      text: h.textContent || "",
      level: Number.parseInt(h.tagName[1]),
    }))

    setHeadings(extractedHeadings)
  }, [content])

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-textSecondary">文档大纲</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {headings.length === 0
          ? (
              <p className="text-xs text-textSecondary text-center mt-4">暂无标题</p>
            )
          : (
              <div className="space-y-1">
                {headings.map(h => (
                  <div
                    key={h.id}
                    className="px-3 py-2 rounded-lg cursor-pointer hover:bg-surfaceHighlight text-textSecondary hover:text-white transition-colors"
                    style={{ paddingLeft: `${h.level * 8 + 12}px` }}
                  >
                    <span className="text-xs opacity-50 mr-2">
                      H
                      {h.level}
                    </span>
                    <span className="text-sm">{h.text}</span>
                  </div>
                ))}
              </div>
            )}
      </div>
    </div>
  )
}
