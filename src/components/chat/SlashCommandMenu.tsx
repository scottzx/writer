import { useEffect, useRef, useState } from "react"
import type { SlashCommand } from "../../types/writing"

const SLASH_COMMANDS: SlashCommand[] = [
  {
    id: "background",
    name: "背景分析",
    icon: "🔍",
    description: "深入分析事件背景，挖掘深层信息",
    systemPrompt: "",
  },
  {
    id: "brief",
    name: "定角度",
    icon: "📐",
    description: "构思立场鲜明的切入角度（博弈对立版）",
    systemPrompt: "",
  },
  {
    id: "title",
    name: "选标题",
    icon: "📝",
    description: "生成 5 个不同风格的标题",
    systemPrompt: "",
  },
  {
    id: "body",
    name: "文章写作",
    icon: "✍️",
    description: "撰写完整时评文章（融合终极版）",
    systemPrompt: "",
  },
  {
    id: "review",
    name: "复写审阅",
    icon: "👮‍♂️",
    description: "时评守门人，残酷去油去水手术",
    systemPrompt: "",
  },
]

interface SlashCommandMenuProps {
  onSelect: (command: SlashCommand) => void
  onClose: () => void
  position: { top?: number, bottom?: number, left: number }
}

export function SlashCommandMenu({ onSelect, onClose, position }: SlashCommandMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % SLASH_COMMANDS.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + SLASH_COMMANDS.length) % SLASH_COMMANDS.length)
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault()
        onSelect(SLASH_COMMANDS[selectedIndex])
      } else if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose, onSelect, selectedIndex])

  return (
    <div
      ref={menuRef}
      className="fixed z-50 w-72 bg-surface border border-border rounded-lg shadow-xl max-h-80 overflow-y-auto"
      style={{
        top: position.top,
        bottom: position.bottom,
        left: position.left,
      }}
    >
      <div className="p-2">
        {SLASH_COMMANDS.map((cmd, index) => (
          <button
            type="button"
            key={cmd.id}
            onClick={() => onSelect(cmd)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              index === selectedIndex
                ? "bg-primary/20 text-primary"
                : "hover:bg-surfaceHighlight text-white"
            }`}
          >
            <span className="text-xl">{cmd.icon}</span>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium">{cmd.name}</div>
              <div className="text-xs text-textSecondary">{cmd.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
