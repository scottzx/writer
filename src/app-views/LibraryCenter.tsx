import React, { useEffect, useRef, useState } from "react"
import { BookMarked, FileText, Plus, Trash2, Upload, X } from "lucide-react"
import mammoth from "mammoth"
import { useStore } from "../stores"
import type { Article } from "../types/article"
import WritingStyleCard from "../components/library/WritingStyleCard"

// 上传弹窗组件
function UploadModal({ onClose }: { onClose: () => void }) {
  const addArticle = useStore(state => state.addArticle)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 简单的 Markdown 转 HTML
  const markdownToHtml = (md: string): string => {
    return md
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
      .replace(/\*\*(.*)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>")
  }

  const processFiles = async (files: File[]) => {
    for (const file of files) {
      const ext = file.name.split(".").pop()?.toLowerCase()
      if (ext === "md") {
        const content = await file.text()
        const htmlContent = markdownToHtml(content)
        const title = file.name.replace(/\.md$/, "")
        addArticle({
          title,
          content: htmlContent,
          fileType: "md",
          wordCount: content.length,
        })
      } else if (ext === "docx") {
        try {
          const arrayBuffer = await file.arrayBuffer()
          const result = await mammoth.convertToHtml({ arrayBuffer })
          const title = file.name.replace(/\.docx$/, "")
          // 计算纯文本字数
          const textResult = await mammoth.extractRawText({ arrayBuffer })
          addArticle({
            title,
            content: result.value,
            fileType: "docx",
            wordCount: textResult.value.length,
          })
        } catch (error) {
          console.error("Failed to parse docx:", error)
          const title = file.name.replace(/\.docx$/, "")
          addArticle({
            title,
            content: `<p>Word 文档解析失败：${file.name}</p>`,
            fileType: "docx",
            wordCount: 0,
          })
        }
      }
    }
    onClose()
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    processFiles(files)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface border border-border rounded-xl w-[500px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">上传文件</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-surfaceHighlight text-textSecondary"
          >
            <X size={20} />
          </button>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${isDragging
            ? "border-primary bg-primary/10"
            : "border-border hover:border-textSecondary"
          }`}
        >
          <Upload size={48} className="mx-auto mb-4 text-textSecondary" />
          <p className="text-white mb-2">拖拽文件到此处，或点击选择</p>
          <p className="text-textSecondary text-sm">支持 .md 和 .docx 文件</p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.docx"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  )
}

// 文章卡片组件
function ArticleCard({
  article,
  isSelected,
  onSelect,
  onDelete,
}: {
  article: Article
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
}) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-xl border cursor-pointer transition-all ${isSelected
        ? "border-primary bg-primary/10"
        : "border-border hover:border-textSecondary bg-surface"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="shrink-0 w-10 h-10 rounded-lg bg-surfaceHighlight flex items-center justify-center">
            <FileText size={20} className="text-textSecondary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-white truncate">{article.title}</h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-textSecondary">
              <span className="px-1.5 py-0.5 rounded bg-surfaceHighlight uppercase">
                {article.fileType}
              </span>
              <span>{formatDate(article.createdAt)}</span>
              {article.wordCount > 0 && (
                <span>
                  {article.wordCount}
                  {" "}
                  字
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="p-1.5 rounded hover:bg-red-500/20 text-textSecondary hover:text-red-400 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}

// 主视图
export default function LibraryCenter() {
  const {
    library,
    loadArticles,
    setSelectedArticle,
    deleteArticle,
    setUploadModalOpen,
  } = useStore()

  useEffect(() => {
    loadArticles()
  }, [loadArticles])

  const selectedArticle = library.articles.find(
    a => a.id === library.selectedArticleId,
  )

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      {/* 左侧：文章列表 */}
      <div className="w-80 border-r border-border flex flex-col bg-background">
        {/* 写作风格卡片 - 固定在顶部 */}
        <WritingStyleCard />

        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookMarked size={20} className="text-primary" />
              <h1 className="text-lg font-bold text-white">文库中心</h1>
            </div>
            <button
              type="button"
              onClick={() => setUploadModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary hover:bg-primaryHover text-background text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              上传
            </button>
          </div>
          <p className="text-xs text-textSecondary">
            共
            {" "}
            {library.articles.length}
            {" "}
            篇文章
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {library.articles.length === 0
            ? (
                <div className="text-center py-12">
                  <FileText size={48} className="mx-auto mb-4 text-border" />
                  <p className="text-textSecondary">暂无文章</p>
                  <p className="text-textSecondary text-sm mt-1">
                    点击上方按钮上传 Markdown 或 Word 文件
                  </p>
                </div>
              )
            : (
                library.articles.map(article => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    isSelected={article.id === library.selectedArticleId}
                    onSelect={() => setSelectedArticle(article.id)}
                    onDelete={() => deleteArticle(article.id)}
                  />
                ))
              )}
        </div>
      </div>

      {/* 右侧：文章预览 */}
      <div className="flex-1 flex flex-col bg-background">
        {selectedArticle
          ? (
              <>
                <div className="p-6 border-b border-border">
                  <h2 className="text-2xl font-bold text-white">
                    {selectedArticle.title}
                  </h2>
                  <div className="flex items-center gap-3 mt-2 text-sm text-textSecondary">
                    <span className="px-2 py-0.5 rounded bg-surfaceHighlight uppercase">
                      {selectedArticle.fileType}
                    </span>
                    <span>
                      {new Date(selectedArticle.createdAt).toLocaleDateString("zh-CN")}
                    </span>
                    {selectedArticle.wordCount > 0 && (
                      <span>
                        {selectedArticle.wordCount}
                        {" "}
                        字
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <div
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                  />
                </div>
              </>
            )
          : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <BookMarked size={64} className="mx-auto mb-4 text-border" />
                  <p className="text-textSecondary">选择一篇文章查看内容</p>
                </div>
              </div>
            )}
      </div>

      {/* 上传弹窗 */}
      {library.isUploadModalOpen && (
        <UploadModal onClose={() => setUploadModalOpen(false)} />
      )}
    </div>
  )
}
