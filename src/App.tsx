
import "~/styles/globals.css"
import "virtual:uno.css"
import React, { useState } from 'react';
import Sidebar from './app-components/Sidebar';
import NewsCenter from './app-views/NewsCenter';
import TimelineAnalysis from './app-views/TimelineAnalysis'; // Still used for direct view if needed, though now mostly modal
import ResearchCenter from './app-views/ResearchCenter';
import EditorWorkspace from './app-views/EditorWorkspace';
import { ViewState } from './app-types';

const App = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.NEWS);

  const getLabelForView = (view: ViewState) => {
    switch (view) {
      case ViewState.STYLE_DNA: return "风格 DNA";
      case ViewState.PUBLISH: return "发布管理";
      case ViewState.DIFF: return "差异比对";
      case ViewState.ASSETS: return "素材库";
      case ViewState.OUTLINE: return "大纲生成";
      default: return view;
    }
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.NEWS:
        // NewsCenter handles navigation to RESEARCH via its internal logic + callback
        return <NewsCenter onNavigate={setCurrentView} />;

      case ViewState.TIMELINE:
        // Keep standalone timeline just in case, but usually accessed via News Modal
        return <TimelineAnalysis />;

      case ViewState.RESEARCH:
        // ResearchCenter handles navigation to EDITOR
        return <ResearchCenter onNavigate={setCurrentView} />;

      case ViewState.EDITOR:
        return <EditorWorkspace />;

      default:
        return (
          <div className="flex-1 flex flex-col items-center justify-center bg-background text-textSecondary h-full">
            <div className="p-8 text-center bg-surface border border-border rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-2">功能开发中</h2>
              <p className="mb-4">"{getLabelForView(currentView)}" 模块即将上线</p>
              <div className="w-16 h-1 bg-primary/20 rounded-full mx-auto overflow-hidden">
                <div className="w-1/2 h-full bg-primary animate-pulse"></div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background text-white font-sans overflow-hidden">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
