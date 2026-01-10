/**
 * デモモード共通スクリプト v3.2
 * ボタンクリックでデータをぼかし表示に切り替え
 * 対応: 顧客マスタ, 案件管理, 予定管理, タスク管理, 人脈管理, ポータル, 営業CSダッシュボード, 人脈ダッシュボード
 */
(function() {
  'use strict';
  
  // ========== 設定 ==========
  var BLUR_AMOUNT = 5;
  var STORAGE_KEY = 'kintone-demo-mode';
  
  // ========== 状態管理 ==========
  var isDemoMode = localStorage.getItem(STORAGE_KEY) === 'true';
  
  // ========== CSS注入 ==========
  function injectStyles() {
    if (document.getElementById('demo-mode-styles')) return;
    
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
      '/* --- 営業CSダッシュボード --- */',
      '.demo-mode .task-card .card-title,',
      '.demo-mode .task-card > div,',
      '.demo-mode .modal-header h2,',
      '.demo-mode .modal-header p,',
      '.demo-mode .modal-question,',
      '.demo-mode .modal-description,',
      '.demo-mode .gijiroku-summary,',
      '.demo-mode .gijiroku-content,',
      '.demo-mode .confirm-file-name,',
      '.demo-mode .confirm-file-info,',
      '.demo-mode .feedback-form,',
      '.demo-mode .form-textarea,',
      '.demo-mode .kakunin-content,',
      '.demo-mode .interaction-text {',
      '  filter: blur(' + BLUR_AMOUNT + 'px) !important;',
      '  user-select: none !important;',
      '}',
      '',
      '/* --- 人脈ダッシュボード --- */',
      '.demo-mode .person-card,',
      '.demo-mode .person-name,',
      '.demo-mode .person-company,',
      '.demo-mode .person-info,',
      '.demo-mode .person-relationship,',
      '.demo-mode .introducer-card-compact,',
      '.demo-mode .introducer-name-compact,',
      '.demo-mode .introducer-company-compact,',
      '.demo-mode .introducer-header-compact,',
      '.demo-mode .intro-count-compact,',
      '.demo-mode .intro-score-compact,',
      '.demo-mode .intro-relationship-compact,',
      '.demo-mode .score-comparison-compact,',
      '.demo-mode .detail-name,',
      '.demo-mode .detail-company,',
      '.demo-mode .detail-value,',
      '.demo-mode .detail-memo,',
      '.demo-mode .detail-relationship,',
      '.demo-mode .stat-value,',
      '.demo-mode .introduced-person-item {',
      '  filter: blur(' + BLUR_AMOUNT + 'px) !important;',
      '  user-select: none !important;',
      '}',
      '',
      '/* --- デモモードトグルボタン --- */',
      '.demo-mode-toggle {',
      '  position: fixed;',
      '  top: 12px;',
      '  right: 12px;',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 8px;',
      '  padding: 8px 14px;',
      '  border-radius: 24px;',
      '  font-size: 13px;',
      '  font-weight: 600;',
      '  cursor: pointer;',
      '  z-index: 99999;',
      '  transition: all 0.3s ease;',
      '  font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont, sans-serif;',
      '  border: none;',
      '  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);',
      '}',
      '',
      '/* OFFの状態 */',
      '.demo-mode-toggle--off {',
      '  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);',
      '  color: #64748b;',
      '}',
      '',
      '.demo-mode-toggle--off:hover {',
      '  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);',
      '  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);',
      '}',
      '',
      '/* ONの状態 */',
      '.demo-mode-toggle--on {',
      '  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);',
      '  color: white;',
      '  box-shadow: 0 2px 10px rgba(239, 68, 68, 0.4);',
      '}',
      '',
      '.demo-mode-toggle--on:hover {',
      '  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);',
      '  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.5);',
      '}',
      '',
      '/* トグルスイッチ風のインジケーター */',
      '.demo-mode-toggle-switch {',
      '  width: 36px;',
      '  height: 20px;',
      '  border-radius: 10px;',
      '  position: relative;',
      '  transition: all 0.3s ease;',
      '}',
      '',
      '.demo-mode-toggle--off .demo-mode-toggle-switch {',
      '  background: #cbd5e1;',
      '}',
      '',
      '.demo-mode-toggle--on .demo-mode-toggle-switch {',
      '  background: rgba(255, 255, 255, 0.3);',
      '}',
      '',
      '.demo-mode-toggle-switch::after {',
      '  content: "";',
      '  position: absolute;',
      '  top: 2px;',
      '  width: 16px;',
      '  height: 16px;',
      '  border-radius: 50%;',
      '  transition: all 0.3s ease;',
      '}',
      '',
      '.demo-mode-toggle--off .demo-mode-toggle-switch::after {',
      '  left: 2px;',
      '  background: white;',
      '}',
      '',
      '.demo-mode-toggle--on .demo-mode-toggle-switch::after {',
      '  left: 18px;',
      '  background: white;',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }
  
  // ========== ボタン作成 ==========
  function createToggleButton() {
    if (document.getElementById('demo-mode-toggle')) return;
    
    var button = document.createElement('button');
    button.id = 'demo-mode-toggle';
    button.className = 'demo-mode-toggle';
    updateButtonState(button);
    
    button.addEventListener('click', function() {
      isDemoMode = !isDemoMode;
      localStorage.setItem(STORAGE_KEY, isDemoMode);
      applyDemoMode();
      updateButtonState(button);
    });
    
    document.body.appendChild(button);
  }
  
  // ========== ボタン状態更新 ==========
  function updateButtonState(button) {
    if (isDemoMode) {
      button.className = 'demo-mode-toggle demo-mode-toggle--on';
      button.innerHTML = '<span>🔒 デモモード ON</span><span class="demo-mode-toggle-switch"></span>';
    } else {
      button.className = 'demo-mode-toggle demo-mode-toggle--off';
      button.innerHTML = '<span>👁 デモモード OFF</span><span class="demo-mode-toggle-switch"></span>';
    }
  }
  
  // ========== デモモード適用 ==========
  function applyDemoMode() {
    if (isDemoMode) {
      document.body.classList.add('demo-mode');
    } else {
      document.body.classList.remove('demo-mode');
    }
  }
  
  // ========== 初期化 ==========
  function init() {
    injectStyles();
    createToggleButton();
    applyDemoMode();
  }
  
  // ========== イベント登録 ==========
  var events = [
    'app.record.index.show',
    'app.record.detail.show',
    'app.record.create.show',
    'app.record.edit.show',
    'mobile.app.record.index.show',
    'mobile.app.record.detail.show',
    'portal.show',
    'space.portal.show',
    'mobile.space.portal.show'
  ];
  
  kintone.events.on(events, function(event) {
    init();
    return event;
  });
  
  // DOMContentLoadedでも初期化（イベント発火前に表示される場合の対策）
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // hashchangeでも初期化（スペース移動時）
  window.addEventListener('hashchange', function() {
    setTimeout(init, 100);
  });
})();
