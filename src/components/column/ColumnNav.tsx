import type { FixedColumnID } from "@shared/types"
import { metadata } from "@shared/metadata"

interface ColumnNavProps {
  currentColumn: FixedColumnID
  onColumnChange: (column: FixedColumnID) => void
  onMoreClick?: () => void
}

export function ColumnNav({ currentColumn, onColumnChange, onMoreClick }: ColumnNavProps) {
  const columns: FixedColumnID[] = ["focus", "hottest", "realtime"]

  return (
    <div className="flex justify-center mb-6">
      <span className="flex p-3 rounded-2xl bg-primary/1 text-sm shadow shadow-primary/20 hover:shadow-primary/50 transition-shadow-500">
        <button
          type="button"
          onClick={onMoreClick}
          className="px-2 hover:bg-primary/10 hover:rounded-md op-70 dark:op-90 cursor-pointer transition-all"
        >
          更多
        </button>
        {columns.map(column => (
          <button
            key={column}
            type="button"
            onClick={() => onColumnChange(column)}
            className={`px-2 hover:bg-primary/10 hover:rounded-md cursor-pointer transition-all ${
              currentColumn === column
                ? "color-primary font-bold"
                : "op-70 dark:op-90"
            }`}
          >
            {metadata[column].name}
          </button>
        ))}
      </span>
    </div>
  )
}
