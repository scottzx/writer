
import React, { useState } from 'react';
import { 
  Bot, Share, Upload, RotateCcw, 
  Bold, Italic, Underline, List, ListOrdered, Link, Image, Wand2, Send, Mic,
  ArrowLeft, Search, Plus, MoreVertical, Calendar, Clock, FileText,
  BarChart2, GitCompare, PenTool, Layout, Activity, GitCommit, ChevronRight
} from 'lucide-react';

// --- Sub-Components: Tab Views ---

const StyleDNAView = () => (
  <div className="flex-1 overflow-y-auto p-8 bg-background">
     <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">风格 DNA 分析</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-sm font-bold text-textSecondary uppercase mb-4">核心基调雷达</h3>
              <div className="h-48 flex items-center justify-center relative">
                 {/* Mock Radar Chart Visual */}
                 <div className="w-32 h-32 border-2 border-primary/30 rounded-full flex items-center justify-center relative">
                    <div className="w-20 h-20 border-2 border-primary/50 rounded-full"></div>
                    <div className="absolute inset-0 bg-primary/10 rotate-45 transform skew-x-12 blur-xl"></div>
                    <div className="absolute top-0 text-xs text-primary font-bold -mt-5">专业性</div>
                    <div className="absolute bottom-0 text-xs text-textSecondary -mb-5">娱乐性</div>
                    <div className="absolute left-0 text-xs text-textSecondary -ml-8">主观</div>
                    <div className="absolute right-0 text-xs text-primary -mr-8">客观</div>
                 </div>
              </div>
           </div>
           
           <div className="bg-surface border border-border rounded-xl p-6 space-y-6">
              <h3 className="text-sm font-bold text-textSecondary uppercase mb-2">特征维度得分</h3>
              <div>
                 <div className="flex justify-between text-sm mb-1 text-white"><span>逻辑密度</span> <span>8.5/10</span></div>
                 <div className="w-full bg-background h-2 rounded-full"><div className="w-[85%] bg-blue-500 h-2 rounded-full"></div></div>
              </div>
              <div>
                 <div className="flex justify-between text-sm mb-1 text-white"><span>情感共鸣</span> <span>4.2/10</span></div>
                 <div className="w-full bg-background h-2 rounded-full"><div className="w-[42%] bg-purple-500 h-2 rounded-full"></div></div>
              </div>
              <div>
                 <div className="flex justify-between text-sm mb-1 text-white"><span>词汇丰富度</span> <span>9.1/10</span></div>
                 <div className="w-full bg-background h-2 rounded-full"><div className="w-[91%] bg-green-500 h-2 rounded-full"></div></div>
              </div>
           </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
           <h3 className="text-sm font-bold text-textSecondary uppercase mb-4">受众画像匹配度</h3>
           <div className="flex gap-4">
              <div className="flex-1 bg-background/50 p-4 rounded-lg border border-primary/30 text-center">
                 <div className="text-2xl font-bold text-primary mb-1">92%</div>
                 <div className="text-xs text-textSecondary">科技发烧友</div>
              </div>
              <div className="flex-1 bg-background/50 p-4 rounded-lg border border-border text-center">
                 <div className="text-2xl font-bold text-white mb-1">65%</div>
                 <div className="text-xs text-textSecondary">普通大众</div>
              </div>
              <div className="flex-1 bg-background/50 p-4 rounded-lg border border-border text-center">
                 <div className="text-2xl font-bold text-white mb-1">40%</div>
                 <div className="text-xs text-textSecondary">青少年学生</div>
              </div>
           </div>
        </div>
     </div>
  </div>
);

const DiffView = () => (
  <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
         <div className="flex items-center gap-4">
            <div className="flex flex-col">
               <span className="text-xs text-textSecondary uppercase">当前版本</span>
               <span className="font-bold text-white">v3.2 (自动保存)</span>
            </div>
            <ArrowLeft className="text-textSecondary" size={16} />
            <div className="flex flex-col">
               <span className="text-xs text-textSecondary uppercase">对比版本</span>
               <select className="bg-background border border-border text-sm rounded p-1 text-white">
                  <option>v3.0 - 2024/05/20 10:00</option>
                  <option>v2.5 - 2024/05/19 18:30</option>
                  <option>v1.0 - 初始草稿</option>
               </select>
            </div>
         </div>
         <div className="flex gap-2">
             <div className="flex items-center gap-1 text-xs text-green-400"><span className="w-2 h-2 bg-green-500 rounded-full"></span> 新增内容</div>
             <div className="flex items-center gap-1 text-xs text-red-400"><span className="w-2 h-2 bg-red-500 rounded-full"></span> 删除内容</div>
         </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
         {/* Left: Old Version */}
         <div className="flex-1 border-r border-border p-8 overflow-y-auto bg-surface/30">
            <h3 className="font-mono text-xs text-textSecondary mb-4">v3.0 源文档</h3>
            <p className="text-gray-400 leading-relaxed font-mono text-sm">
               量子计算的承诺长期以来一直徘徊在技术进步的地平线上。<span className="bg-red-900/50 text-red-200 decoration-red-500 line-through">这是一个遥不可及的梦想。</span>然而，随着我们深入 21 世纪，这个海市蜃楼正在凝结成一个有形的现实。
            </p>
         </div>
         {/* Right: New Version */}
         <div className="flex-1 p-8 overflow-y-auto bg-background">
            <h3 className="font-mono text-xs text-textSecondary mb-4">v3.2 当前文档</h3>
            <p className="text-gray-300 leading-relaxed font-mono text-sm">
               量子计算的承诺长期以来一直徘徊在技术进步的地平线上。<span className="bg-green-900/50 text-green-200">像是一个闪烁着无限算力却又触不可及的海市蜃楼。</span>然而，随着我们深入 21 世纪，这个海市蜃楼正在凝结成一个有形的、<span className="bg-green-900/50 text-green-200">尽管复杂的</span>现实。
            </p>
         </div>
      </div>
  </div>
);

const EditorCore = () => (
   <div className="flex flex-1 h-full overflow-hidden bg-background">
      {/* Left Panel: Document Map */}
      <div className="w-64 bg-surface border-r border-border hidden lg:flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-textSecondary mb-4">文档导航</h3>
          <div className="flex bg-background p-1 rounded-lg">
             <button className="flex-1 py-1 px-2 text-xs font-medium rounded bg-surface text-white shadow-sm">大纲</button>
             <button className="flex-1 py-1 px-2 text-xs font-medium text-textSecondary hover:text-white">研究资料</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {['引言：量子领域', '技术现状', '量子比特解释', '叠加态原理', '量子纠缠', '未来影响', '结论'].map((item, i) => (
             <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${i === 0 ? 'bg-primary/10 text-primary' : 'text-textSecondary hover:bg-surfaceHighlight hover:text-white'}`}>
                <span className="text-xs opacity-50">{i === 0 || i === 6 ? 'H1' : 'H2'}</span>
                <span className="text-sm font-medium truncate">{item}</span>
             </div>
          ))}
        </div>
        <div className="p-4 border-t border-border">
           <div className="flex justify-between text-xs text-textSecondary mb-2">
             <span>字数统计</span>
             <span className="font-mono">1,240 / 2,000</span>
           </div>
           <div className="w-full bg-background rounded-full h-1.5">
             <div className="bg-primary h-1.5 rounded-full" style={{ width: '62%' }}></div>
           </div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col relative bg-gray-50 dark:bg-background overflow-hidden">
        {/* Floating Toolbar */}
        <div className="flex justify-center p-4 sticky top-0 z-10">
           <div className="bg-surfaceHighlight rounded-xl shadow-lg border border-border px-3 py-2 flex items-center gap-1">
              <div className="flex items-center gap-1 border-r border-border pr-2 mr-1">
                 <span className="font-bold text-sm px-2 text-white">H1</span>
                 <span className="font-bold text-sm px-2 text-textSecondary">H2</span>
              </div>
              <button className="p-1.5 rounded hover:bg-border text-white"><Bold size={18} /></button>
              <button className="p-1.5 rounded hover:bg-border text-white"><Italic size={18} /></button>
              <button className="p-1.5 rounded hover:bg-border text-white"><Underline size={18} /></button>
              <div className="w-px h-4 bg-border mx-1" />
              <button className="p-1.5 rounded hover:bg-border text-white"><List size={18} /></button>
              <button className="p-1.5 rounded hover:bg-border text-white"><ListOrdered size={18} /></button>
              <div className="w-px h-4 bg-border mx-1" />
              <button className="p-1.5 rounded hover:bg-border text-white"><Link size={18} /></button>
              <button className="p-1.5 rounded hover:bg-border text-white"><Image size={18} /></button>
              <div className="w-px h-4 bg-border mx-1" />
              <button className="flex items-center gap-1.5 px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold">
                <Wand2 size={14} /> 润色
              </button>
           </div>
        </div>

        {/* Text Area */}
        <div className="flex-1 overflow-y-auto flex justify-center px-4 pb-20">
           <div className="w-full max-w-[800px] bg-surface min-h-[1000px] shadow-sm rounded-lg p-12 sm:p-16 mb-10">
              <h1 className="text-4xl font-bold mb-6 text-white tracking-tight">量子领域的入门指南</h1>
              <p className="text-lg leading-relaxed text-gray-300 mb-6">
                量子计算的承诺长期以来一直徘徊在技术进步的地平线上，像是一个闪烁着无限算力却又触不可及的海市蜃楼。然而，随着我们深入 21 世纪，这个海市蜃楼正在凝结成一个有形的、尽管复杂的现实。
              </p>
              <p className="text-lg leading-relaxed text-gray-300 mb-6">
                与经典计算机以 0 和 1 的确定性二进制进行思考不同，量子机器在量子比特的概率迷雾中运作。这种根本性的转变使它们能够同时探索广阔的计算可能性领域。
              </p>
              <div className="relative group mb-6">
                 <p className="text-lg leading-relaxed text-gray-300 p-1 -m-1 rounded border-l-2 border-transparent hover:border-primary hover:bg-white/5 transition-colors">
                    但这对于普通人来说到底意味着什么？<span className="bg-primary/20 border-b-2 border-primary text-white">虽然我们近期不会在办公桌上看到量子笔记本电脑，但其连锁反应将在医学、密码学和材料科学领域产生深远影响。</span>
                 </p>
              </div>
              <h2 className="text-2xl font-bold mt-10 mb-4 text-white">技术现状</h2>
              <p className="text-lg leading-relaxed text-gray-300 mb-6">
                 今天的量子处理器属于含噪声中尺度量子（NISQ）设备。它们虽然强大，但容易受到热噪声和电磁干扰引起的错误影响。工程师们目前正在竞相构建纠错码，以稳定这些脆弱的量子态。
              </p>
              <span className="text-primary animate-pulse">|</span>
           </div>
        </div>
      </div>

      {/* Right Panel: AI Assistant */}
      <div className="w-80 bg-surfaceHighlight border-l border-border flex flex-col shrink-0 shadow-xl z-20">
        <div className="p-5 border-b border-border">
           <div className="bg-gradient-to-br from-surface to-[#0d1518] border border-border rounded-xl p-4 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3 relative z-10">
                 <h3 className="text-white text-sm font-semibold flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> 风格档案
                 </h3>
                 <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded font-bold uppercase">科普向</span>
              </div>
              <div className="space-y-3 relative z-10">
                 <div>
                    <div className="flex justify-between text-xs text-textSecondary mb-1">
                       <span>词汇深度</span> <span className="text-primary">进阶</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-1">
                       <div className="bg-gradient-to-r from-blue-500 to-primary h-1 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-xs text-textSecondary mb-1">
                       <span>语气亲和力</span> <span className="text-green-400">高</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-1">
                       <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-1 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-xs text-textSecondary mb-1">
                       <span>句式变化</span> <span className="text-orange-400">中等</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-1">
                       <div className="bg-gradient-to-r from-orange-500 to-yellow-400 h-1 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
           <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                 <Bot size={18} className="text-primary" />
              </div>
              <div className="bg-surface border border-border rounded-lg rounded-tl-none p-3">
                 <p className="text-sm text-white">这段关于“量子比特”的介绍非常清晰。需要我为你补充一些关于“量子叠加态”的类比吗？比如“旋转的硬币”？</p>
              </div>
           </div>
           
           <div className="flex gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                 <span className="text-xs font-bold text-indigo-400">ME</span>
              </div>
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg rounded-tr-none p-3">
                 <p className="text-sm text-white">好的，请给我两个不同的类比选项。</p>
              </div>
           </div>

           <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                 <Bot size={18} className="text-primary" />
              </div>
              <div className="bg-surface border border-border rounded-lg rounded-tl-none p-3 space-y-3">
                 <p className="text-sm text-white">没问题，这里有两个选项：</p>
                 <div className="space-y-2">
                    <button className="w-full text-left text-xs bg-background hover:bg-surfaceHighlight p-2 rounded border border-border transition-colors">
                       <span className="font-bold text-primary block mb-1">选项 A：旋转的硬币</span>
                       当硬币在桌面上旋转时，你无法确定它是正面还是反面，它同时处于两种状态之中。
                    </button>
                    <button className="w-full text-left text-xs bg-background hover:bg-surfaceHighlight p-2 rounded border border-border transition-colors">
                       <span className="font-bold text-primary block mb-1">选项 B：乐谱的和弦</span>
                       就像钢琴上的和弦是由多个音符同时组成的，量子态也是多种可能性的叠加。
                    </button>
                 </div>
              </div>
           </div>
        </div>

        <div className="p-4 border-t border-border bg-surface">
           <div className="relative">
              <input 
                 type="text" 
                 placeholder="询问 AI 助手..." 
                 className="w-full bg-background border border-border rounded-lg py-3 pl-4 pr-10 text-sm text-white placeholder-textSecondary focus:border-primary focus:outline-none transition-colors"
              />
              <button className="absolute right-2 top-2 p-1 text-textSecondary hover:text-white">
                 <Send size={16} />
              </button>
           </div>
           <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2">
                 <button className="p-1.5 rounded hover:bg-background text-textSecondary hover:text-white transition-colors">
                    <Mic size={16} />
                 </button>
                 <button className="p-1.5 rounded hover:bg-background text-textSecondary hover:text-white transition-colors">
                    <Image size={16} />
                 </button>
              </div>
              <span className="text-[10px] text-textSecondary">AI 模型：Gemini Pro</span>
           </div>
        </div>
      </div>
   </div>
);


// --- Project List View ---
const ProjectList = ({ onSelect }: { onSelect: (id: string) => void }) => {
   const notes = [
      { id: '1', title: '量子领域的入门指南', date: '2小时前', words: 1240, status: '撰写中', tag: '科技' },
      { id: '2', title: '2025年咖啡市场趋势分析', date: '昨天', words: 3500, status: '已审阅', tag: '商业' },
      { id: '3', title: '微服务架构的最佳实践', date: '3天前', words: 890, status: '草稿', tag: '技术' },
      { id: '4', title: '关于未来城市规划的思考', date: '上周', words: 2100, status: '待发布', tag: '社论' },
   ];

   return (
      <div className="flex-1 overflow-y-auto p-8 bg-background">
         <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-8">
               <div>
                  <h1 className="text-3xl font-bold text-white mb-2">项目笔记库</h1>
                  <p className="text-textSecondary">集中管理您的所有创作项目与文稿。</p>
               </div>
               <button onClick={() => onSelect('new')} className="bg-primary hover:bg-primaryHover text-background px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                  <Plus size={18} /> 新建文档
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {notes.map(note => (
                  <div key={note.id} onClick={() => onSelect(note.id)} className="bg-surface border border-border hover:border-primary/50 rounded-xl p-5 cursor-pointer group transition-all hover:bg-surfaceHighlight/50">
                     <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-surfaceHighlight flex items-center justify-center text-white">
                           <FileText size={20} />
                        </div>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                           note.status === '撰写中' ? 'bg-primary/10 text-primary border-primary/20' : 
                           note.status === '草稿' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' : 
                           'bg-green-500/10 text-green-400 border-green-500/20'
                        }`}>
                           {note.status}
                        </span>
                     </div>
                     <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{note.title}</h3>
                     <div className="flex items-center gap-4 text-xs text-textSecondary mt-6 pt-4 border-t border-border">
                        <span className="flex items-center gap-1"><Clock size={12} /> {note.date}</span>
                        <span className="flex items-center gap-1"><Layout size={12} /> {note.words} 字</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

// --- Main Container ---
const EditorWorkspace = () => {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'EDITOR' | 'STYLE' | 'DIFF'>('EDITOR');

  if (!activeProjectId) {
     return <ProjectList onSelect={setActiveProjectId} />;
  }

  return (
    <div className="flex flex-col h-full bg-background animate-in slide-in-from-right duration-300">
       {/* Header with Tabs */}
       <div className="h-16 border-b border-border bg-background flex items-center justify-between px-4 shrink-0 z-30">
          <div className="flex items-center gap-4">
             <button onClick={() => setActiveProjectId(null)} className="p-2 -ml-2 rounded-full hover:bg-surfaceHighlight text-textSecondary hover:text-white transition-colors">
                <ArrowLeft size={20} />
             </button>
             <h2 className="text-sm font-bold text-white">量子领域的入门指南</h2>
          </div>
          
          <div className="flex bg-surface rounded-lg p-1 gap-1">
             <button 
               onClick={() => setActiveTab('EDITOR')}
               className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'EDITOR' ? 'bg-primary text-background shadow' : 'text-textSecondary hover:text-white'}`}
             >
                <PenTool size={14} /> 写作
             </button>
             <button 
               onClick={() => setActiveTab('STYLE')}
               className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'STYLE' ? 'bg-primary text-background shadow' : 'text-textSecondary hover:text-white'}`}
             >
                <Activity size={14} /> 风格 DNA
             </button>
             <button 
               onClick={() => setActiveTab('DIFF')}
               className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'DIFF' ? 'bg-primary text-background shadow' : 'text-textSecondary hover:text-white'}`}
             >
                <GitCompare size={14} /> 差异比对
             </button>
          </div>

          <div className="flex items-center gap-2">
             <button className="flex items-center gap-2 bg-surface hover:bg-surfaceHighlight text-textSecondary hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium border border-border transition-colors">
                <Share size={14} /> 分享
             </button>
             <button className="flex items-center gap-2 bg-primary hover:bg-primaryHover text-background px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                <Upload size={14} /> 发布
             </button>
          </div>
       </div>

       {/* Content Area */}
       <div className="flex-1 overflow-hidden relative">
          {activeTab === 'EDITOR' && <EditorCore />}
          {activeTab === 'STYLE' && <StyleDNAView />}
          {activeTab === 'DIFF' && <DiffView />}
       </div>
    </div>
  );
};

export default EditorWorkspace;
