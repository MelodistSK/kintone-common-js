/**
 * デモモード共通スクリプト v2.0
 * 特定ユーザーでログイン時にデータをぼかし表示
 * 対応: 顧客マスタ, 案件管理, 予定管理, タスク管理, 人脈管理
 */
(function() {
  'use strict';
  
  // ========== 設定 ==========
  var DEMO_USERS = ['partner'];
  var BLUR_AMOUNT = 4;
  
  // ========== イベント登録 ==========
  var events = [
    'app.record.index.show',
    'app.record.detail.show',
    'app.record.create.show',
    'app.record.edit.show',
    'mobile.app.record.index.show',
    'mobile.app.record.detail.show'
  ];
  
  kintone.events.on(events, function(event) {
    var loginUser = kintone.getLoginUser();
    
    // デモユーザーでなければ何もしない
    if (DEMO_USERS.indexOf(loginUser.code) === -1) {
      return event;
    }
    
    // CSS注入（1回のみ）
    if (!document.getElementById('demo-mode-styles')) {
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
        '/* --- デモモードバッジ --- */',
        '.demo-mode-badge {',
        '  position: fixed;',
        '  top: 10px;',
        '  right: 10px;',
        '  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);',
        '  color: white;',
        '  padding: 8px 16px;',
        '  border-radius: 20px;',
        '  font-size: 13px;',
        '  font-weight: 600;',
        '  z-index: 99999;',
        '  box-shadow: 0 2px 10px rgba(239, 68, 68, 0.4);',
        '  font-family: "Noto Sans JP", sans-serif;',
        '}'
      ].join('\n');
      document.head.appendChild(style);
    }
    
    // bodyにクラス追加
    document.body.classList.add('demo-mode');
    
    // バッジ表示（1回のみ）
    if (!document.getElementById('demo-mode-badge')) {
      var badge = document.createElement('div');
      badge.id = 'demo-mode-badge';
      badge.className = 'demo-mode-badge';
      badge.textContent = '🔒 デモモード';
      document.body.appendChild(badge);
    }
    
    return event;
  });
})();
