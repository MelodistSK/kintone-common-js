/**
 * デモモード共通スクリプト v3.1
 * ボタンクリックでデータをぼかし表示に切り替え
 * 対応: 顧客マスタ, 案件管理, 予定管理, タスク管理, 人脈管理, ポータル売上グラフ
 */
(function() {
  'use strict';
  
  console.log('[デモモード] スクリプト読み込み開始');
  
  // ========== 設定 ==========
  var BLUR_AMOUNT = 7;
  var STORAGE_KEY = 'kintone-demo-mode';
  
  // ========== 状態管理 ==========
  var isDemoMode = localStorage.getItem(STORAGE_KEY) === 'true';
  
  // ========== CSS注入 ==========
  function injectStyles() {
    if (document.getElementById('demo-mode-styles')) {
      console.log('[デモモード] CSS既に注入済み');
      return;
    }
    
    console.log('[デモモード] CSS注入中...');
    
    var style = document.createElement('style');
    style.id = 'demo-mode-styles';
    style.textContent = [
      '/* ======================================== */',
      '/* デモモード - データぼかしCSS */',
      '/* ======================================== */',
      '',
      '/* --- kintone標準画面 --- */',
      '.demo-mode .recordlist-cell-gaia,',
      '.demo-mode .value-gaia,',
      '.demo-mode .control-value-gaia {',
      '  filter: blur(' + BLUR_AMOUNT + 'px) !important;',
      '  user-select: none !important;',
      '}',
      '',
      '/* --- 顧客マスタ / 人脈管理 (.customer-*) --- */',
      '.demo-mode .customer-card-name,',
      '.demo-mode .customer-card-rep,',
      '.demo-mode .customer-card-info-value,',
      '.demo-mode .customer-card-revenue-value,',
      '.demo-mode .customer-modal-info-value,',
      '.demo-mode .customer-modal-title,',
      '.demo-mode .customer-form-input,',
      '.demo-mode .customer-form-select,',
      '.demo-mode .customer-form-textarea,',
      '.demo-mode .customer-minutes-item,',
      '.demo-mode .customer-minutes-title,',
      '.demo-mode .customer-minutes-memo,',
      '.demo-mode .customer-proposal-item,',
      '.demo-mode .customer-stat-value,',
      '.demo-mode .wizard-contact-item {',
      '  filter: blur(' + BLUR_AMOUNT + 'px) !important;',
      '  user-select: none !important;',
      '}',
      '',
      '/* --- 案件管理 (.deal-*) --- */',
      '.demo-mode .deal-card-name,',
      '.demo-mode .deal-card-company,',
      '.demo-mode .deal-card-info-value,',
      '.demo-mode .deal-modal-info-value,',
      '.demo-mode .deal-modal-title,',
      '.demo-mode .deal-form-input,',
      '.demo-mode .deal-form-select,',
      '.demo-mode .deal-form-textarea,',
      '.demo-mode .deal-minutes-item,',
      '.demo-mode .deal-minutes-title,',
      '.demo-mode .deal-minutes-memo,',
      '.demo-mode .deal-contact-item,',
      '.demo-mode .deal-stat-value,',
      '.demo-mode .deal-card-next-action-content {',
      '  filter: blur(' + BLUR_AMOUNT + 'px) !important;',
      '  user-select: none !important;',
      '}',
      '',
      '/* --- 予定管理 (.apo-*) --- */',
      '.demo-mode .apo-item-title,',
      '.demo-mode .apo-item-company,',
      '.demo-mode .apo-item-meta,',
      '.demo-mode .apo-modal-title,',
      '.demo-mode .apo-form-input,',
      '.demo-mode .apo-form-select,',
      '.demo-mode .apo-form-textarea,',
      '.demo-mode .apo-participant-item,',
      '.demo-mode .apo-stat-value,',
      '.demo-mode .apo-minutes-box {',
      '  filter: blur(' + BLUR_AMOUNT + 'px) !important;',
      '  user-select: none !important;',
      '}',
      '',
      '/* --- タスク管理 (.kanban-*) --- */',
      '.demo-mode .kanban-card strong,',
      '.demo-mode .kanban-card .due-label,',
      '.demo-mode .kanban-card .assignee-label,',
      '.demo-mode .modal-body h3,',
      '.demo-mode .modal-body p,',
      '.demo-mode .description-scroll,',
      '.demo-mode .history-item,',
      '.demo-mode .history-content,',
      '.demo-mode .interaction-item,',
      '.demo-mode .interaction-content,',
      '.demo-mode .magical-preview {',
      '  filter: blur(' + BLUR_AMOUNT + 'px) !important;',
      '  user-select: none !important;',
      '}',
      '',
      '/* --- ポータル 売上グラフ・サマリー --- */',
      '.demo-mode .chart-value,',
      '.demo-mode .chart-bar-segment,',
      '.demo-mode .segment-tooltip,',
      '.demo-mode .tooltip-row,',
      '.demo-mode .tooltip-company,',
      '.demo-mode .tooltip-amount,',
      '.demo-mode .revenue-summary-value,',
      '.demo-mode .revenue-summary-change {',
      '  filter: blur(' + BLUR_AMOUNT + 'px) !important;',
      '  user-select: none !important;',
      '}',
      '',
      '/* --- ポータル パイプライン・アラート --- */',
      '.demo-mode .pipeline-count,',
      '.demo-mode .summary-value,',
      '.demo-mode .alert-text,',
      '.demo-mode .alert-text a {',
      '  filter: blur(' + BLUR_AMOUNT + 'px) !important;',
      '  user-select: none !important;',
      '}',
      '',
      '/* --- ポータル 顧客ポートフォリオ --- */',
      '.demo-mode .rank-count,',
      '.demo-mode .rank-bar-fill,',
      '.demo-mode .industry-count {',
      '  filter: blur(' + BLUR_AMOUNT + 'px) !important;',
      '  user-select: none !important;',
      '}',
      '',
      '/* --- ポータル 人脈リマインダー --- */',
      '.demo-mode .contact-name,',
      '.demo-mode .contact-company,',
      '.demo-mode .contact-date {',
      '  filter: blur(' + BLUR_AMOUNT + 'px) !important;',
      '  user-select: none !important;',
      '}',
      '',
      '/* --- ポータル 予定・タスク一覧 --- */',
      '.demo-mode .list-item-title,',
      '.demo-mode .list-item-meta,',
      '.demo-mode .list-item-time {',
      '  filter: blur(' + BLUR_AMOUNT + 'px) !important;',
      '  user-select: none !important;',
      '}',
      '',
      '/* --- デモモードトグルボタン --- */',
      '#demo-mode-toggle {',
      '  position: fixed !important;',
      '  top: 12px !important;',
      '  right: 12px !important;',
      '  display: flex !important;',
      '  align-items: center !important;',
      '  gap: 8px !important;',
      '  padding: 8px 14px !important;',
      '  border-radius: 24px !important;',
      '  font-size: 13px !important;',
      '  font-weight: 600 !important;',
      '  cursor: pointer !important;',
      '  z-index: 999999 !important;',
      '  transition: all 0.3s ease !important;',
      '  font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont, sans-serif !important;',
      '  border: none !important;',
      '  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;',
      '  visibility: visible !important;',
      '  opacity: 1 !important;',
      '}',
      '',
      '/* OFFの状態 */',
      '#demo-mode-toggle.demo-mode-toggle--off {',
      '  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%) !important;',
      '  color: #64748b !important;',
      '}',
      '',
      '#demo-mode-toggle.demo-mode-toggle--off:hover {',
      '  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%) !important;',
      '  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;',
      '}',
      '',
      '/* ONの状態 */',
      '#demo-mode-toggle.demo-mode-toggle--on {',
      '  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;',
      '  color: white !important;',
      '  box-shadow: 0 2px 10px rgba(239, 68, 68, 0.4) !important;',
      '}',
      '',
      '#demo-mode-toggle.demo-mode-toggle--on:hover {',
      '  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%) !important;',
      '  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.5) !important;',
      '}',
      '',
      '/* トグルスイッチ風のインジケーター */',
      '.demo-mode-toggle-switch {',
      '  width: 36px !important;',
      '  height: 20px !important;',
      '  border-radius: 10px !important;',
      '  position: relative !important;',
      '  transition: all 0.3s ease !important;',
      '  display: inline-block !important;',
      '}',
      '',
      '#demo-mode-toggle.demo-mode-toggle--off .demo-mode-toggle-switch {',
      '  background: #cbd5e1 !important;',
      '}',
      '',
      '#demo-mode-toggle.demo-mode-toggle--on .demo-mode-toggle-switch {',
      '  background: rgba(255, 255, 255, 0.3) !important;',
      '}',
      '',
      '.demo-mode-toggle-switch::after {',
      '  content: "" !important;',
      '  position: absolute !important;',
      '  top: 2px !important;',
      '  width: 16px !important;',
      '  height: 16px !important;',
      '  border-radius: 50% !important;',
      '  transition: all 0.3s ease !important;',
      '  background: white !important;',
      '}',
      '',
      '#demo-mode-toggle.demo-mode-toggle--off .demo-mode-toggle-switch::after {',
      '  left: 2px !important;',
      '}',
      '',
      '#demo-mode-toggle.demo-mode-toggle--on .demo-mode-toggle-switch::after {',
      '  left: 18px !important;',
      '}'
    ].join('\n');
    document.head.appendChild(style);
    console.log('[デモモード] CSS注入完了');
  }
  
  // ========== ボタン作成 ==========
  function createToggleButton() {
    // 既存のボタンがあれば削除して再作成
    var existing = document.getElementById('demo-mode-toggle');
    if (existing) {
      existing.remove();
    }
    
    console.log('[デモモード] ボタン作成中...');
    
    var button = document.createElement('button');
    button.id = 'demo-mode-toggle';
    button.type = 'button';
    updateButtonState(button);
    
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('[デモモード] ボタンクリック');
      isDemoMode = !isDemoMode;
      localStorage.setItem(STORAGE_KEY, isDemoMode);
      applyDemoMode();
      updateButtonState(button);
    });
    
    document.body.appendChild(button);
    console.log('[デモモード] ボタン作成完了');
  }
  
  // ========== ボタン状態更新 ==========
  function updateButtonState(button) {
    if (isDemoMode) {
      button.className = 'demo-mode-toggle--on';
      button.innerHTML = '<span>🔒 デモモード ON</span><span class="demo-mode-toggle-switch"></span>';
    } else {
      button.className = 'demo-mode-toggle--off';
      button.innerHTML = '<span>👁 デモモード OFF</span><span class="demo-mode-toggle-switch"></span>';
    }
  }
  
  // ========== デモモード適用 ==========
  function applyDemoMode() {
    if (isDemoMode) {
      document.body.classList.add('demo-mode');
      console.log('[デモモード] ON');
    } else {
      document.body.classList.remove('demo-mode');
      console.log('[デモモード] OFF');
    }
  }
  
  // ========== 初期化 ==========
  function init() {
    console.log('[デモモード] 初期化開始');
    injectStyles();
    createToggleButton();
    applyDemoMode();
    console.log('[デモモード] 初期化完了');
  }
  
  // ========== イベント登録 ==========
  var events = [
    'app.record.index.show',
    'app.record.detail.show',
    'app.record.create.show',
    'app.record.edit.show',
    'mobile.app.record.index.show',
    'mobile.app.record.detail.show',
    'portal.show'
  ];
  
  kintone.events.on(events, function(event) {
    console.log('[デモモード] kintoneイベント発火:', event.type);
    // 少し遅延させて確実にDOMが準備されてから実行
    setTimeout(init, 100);
    return event;
  });
  
  // ページ読み込み時にも実行（kintoneイベントが発火しない場合の対策）
  function initOnLoad() {
    console.log('[デモモード] ページ読み込み検知');
    setTimeout(init, 500);
  }
  
  if (document.readyState === 'complete') {
    initOnLoad();
  } else {
    window.addEventListener('load', initOnLoad);
  }
  
  console.log('[デモモード] スクリプト読み込み完了');
})();
