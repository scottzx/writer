
import React from 'react';
import { Rocket, Globe, Microscope, ArrowRight, Save, CheckCircle, HelpCircle } from 'lucide-react';

interface TimelineAnalysisProps {
  isModal?: boolean;
  onProceed?: () => void;
}

const TimelineItem = ({ year, impact, title, desc, active, icon: Icon }: any) => (
  <div className={`relative grid grid-cols-[40px_1fr] gap-x-4 mb-8 group cursor-pointer ${!active && 'opacity-60 hover:opacity-100'}`}>
    <div className="relative flex flex-col items-center pt-1">
      <div className={`z-10 flex items-center justify-center w-10 h-10 rounded-full border-4 border-background ${active ? 'bg-primary shadow-[0_0_15px_rgba(19,182,236,0.5)]' : 'bg-surface group-hover:bg-white group-hover:text-background'} transition-colors`}>
        {Icon ? <Icon size={20} className={active ? 'text-background' : 'text-white group-hover:text-background'} /> : <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </div>
    <div className="flex flex-col pt-1">
      <div className="flex justify-between items-baseline mb-1">
        <span className={`${active ? 'text-primary font-bold' : 'text-textSecondary'} text-xs tracking-wider uppercase`}>{year} • {impact === 'High' ? '高' : '中'} 影响力</span>
      </div>
      <div className={`p-4 rounded-xl border transition-all ${active ? 'bg-surface border-primary/30 shadow-lg' : 'bg-surface/50 border-transparent group-hover:border-surfaceHighlight'}`}>
        <h3 className="text-white text-base font-bold mb-1">{title}</h3>
        <p className="text-textSecondary text-sm leading-relaxed line-clamp-2">{desc}</p>
      </div>
    </div>
  </div>
);

const TimelineAnalysis: React.FC<TimelineAnalysisProps> = ({ isModal, onProceed }) => {
  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* Left Sidebar Timeline */}
      <div className="w-1/3 border-r border-border bg-background/50 flex flex-col relative">
        <div className="p-6 border-b border-border bg-background/95 backdrop-blur z-10">
           {!isModal && (
             <>
               <h1 className="text-2xl font-black mb-1">火星殖民计划</h1>
               <p className="text-textSecondary text-xs">关键历史事件时间轴</p>
             </>
           )}
           {isModal && (
             <div>
                <span className="text-primary text-xs font-bold uppercase tracking-wider">事件脉络</span>
             </div>
           )}
           <div className="flex gap-2 mt-4">
             <span className="px-3 py-1 bg-primary text-background rounded-full text-xs font-bold">全部</span>
             <span className="px-3 py-1 bg-surface border border-border rounded-full text-xs text-textSecondary">高优先级</span>
             <span className="px-3 py-1 bg-surface border border-border rounded-full text-xs text-textSecondary">中优先级</span>
           </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 relative">
          <div className="absolute left-[39px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-border via-border to-transparent"></div>
          <TimelineItem 
            active={true}
            year="2024" 
            impact="High" 
            title="首次载人飞掠"
            desc="Artemis V 任务成功完成绕火星局部轨道飞行，标志着人类首次近距离接触这颗红色星球。"
            icon={Rocket}
          />
           <TimelineItem 
            year="2020" 
            impact="Medium" 
            title="毅力号登陆"
            desc="NASA 将毅力号探测器降落在耶泽罗陨石坑，以寻找古代微生物生命的迹象并收集样本。"
            icon={Microscope}
          />
           <TimelineItem 
            year="2030" 
            impact="High" 
            title="首个基地建立"
            desc="完成“阿尔法基地”建设，这是首个能够维持 6 名船员生存的永久性加压栖息地。"
            icon={Globe}
          />
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col bg-background relative">
        <div className="px-8 py-5 border-b border-border bg-surface/30 flex justify-between items-center">
            <div>
              <p className="text-textSecondary text-xs font-bold uppercase tracking-wider mb-1">深度洞察</p>
              <h2 className="text-white text-xl font-bold">事件详情分析</h2>
            </div>
            
        </div>

        <div className="flex-1 overflow-y-auto p-8 pb-24">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-white text-lg font-semibold">事件要素：首次载人飞掠 (2024)</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 uppercase tracking-wide">高度重要</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="bg-surface rounded-xl p-5 border border-transparent hover:border-textSecondary/20">
                  <p className="text-textSecondary text-xs font-bold uppercase tracking-wider mb-3">历史背景</p>
                  <p className="text-white text-sm leading-relaxed">
                    继无人 Artemis 任务取得成功后，政治压力和私营部门的激烈竞争加速了载人轨道任务的时间表。这一事件对于测试深空生存系统至关重要，为后续着陆奠定了基础。
                  </p>
               </div>
               <div className="bg-surface rounded-xl p-5 border border-transparent hover:border-textSecondary/20">
                  <p className="text-textSecondary text-xs font-bold uppercase tracking-wider mb-3">关键参与者</p>
                  <div className="flex flex-wrap gap-2">
                    {['NASA', 'SpaceX', 'ESA (欧空局)'].map(tag => (
                      <span key={tag} className="flex items-center gap-2 bg-background/50 rounded-lg px-3 py-1.5 text-sm font-medium text-white">
                        <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-purple-500" /> {tag}
                      </span>
                    ))}
                  </div>
               </div>
               <div className="col-span-2 bg-surface rounded-xl p-5 border border-transparent hover:border-textSecondary/20">
                  <p className="text-textSecondary text-xs font-bold uppercase tracking-wider mb-3">影响分析</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">技术层面</h4>
                      <p className="text-textSecondary text-xs leading-relaxed">验证了辐射屏蔽的有效性以及深空条件下空气/水的长期循环利用技术。</p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">社会层面</h4>
                      <p className="text-textSecondary text-xs leading-relaxed">重新点燃了全球对 STEM 领域的兴趣；直播收视率超过了 1969 年登月时的 400%。</p>
                    </div>
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-r from-surfaceHighlight to-surfaceHighlight/50 rounded-xl p-1 mb-6">
              <div className="bg-background/40 rounded-[10px] p-4 flex gap-4 items-start">
                <div className="bg-green-500/20 text-green-400 p-2 rounded-lg">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">事件状态：已完成并核实</h4>
                  <p className="text-textSecondary text-sm mt-1">此事件为既定历史事实。数据来源包括任务日志、公共遥测数据和经核实的新闻报道。</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6 mt-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-base font-semibold">AI 助手反馈</h3>
                </div>
                <div className="bg-surface/30 rounded-xl p-4 border border-border flex gap-4">
                  <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                    <HelpCircle size={20} />
                  </div>
                  <div>
                    <p className="text-white text-sm mb-3">此事件摘要是否有任何不清楚的地方？我可以重新分析特定方面或寻找替代来源。</p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surfaceHighlight text-xs text-textSecondary border border-border">解释 "Artemis V"</button>
                      <button className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surfaceHighlight text-xs text-textSecondary border border-border">关于辐射屏蔽的更多信息</button>
                    </div>
                  </div>
                </div>
            </div>
        </div>

        {/* Footer Action Area for Modal */}
        {isModal && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-surface/90 backdrop-blur flex justify-between items-center z-20">
             <span className="text-textSecondary text-sm">确定以此事件为核心进行创作？</span>
             <button 
               onClick={onProceed}
               className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary hover:bg-primaryHover text-background text-sm font-bold shadow-[0_0_15px_rgba(19,182,236,0.3)] transition-all transform hover:scale-105"
             >
                创建研究项目 <ArrowRight size={16} />
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineAnalysis;
