/**
 * kintone デモモード共通スクリプト
 * partner ユーザーでログイン時、データ部分をぼかす
 */
(function() {
  'use strict';
  
  // ========== 設定 ==========
  const DEMO_USERS = ['partner'];
  const BLUR_AMOUNT = 3;
  
  // ========== 処理 ==========
  const events = [
    'app.record.index.show',
    'app.record.detail.show',
    'app.record.create.show',
    'app.record.edit.show',
    'mobile.app.record.index.show',
    'mobile.app.record.detail.show'
  ];
  
  kintone.events.on(events, function(event) {
    const loginUser = kintone.getLoginUser();
    
    if (!DEMO_USERS.includes(loginUser.code)) {
      return event;
    }
    
    // CSS注入（1回だけ）
    if (!document.getElementById('demo-mode-styles')) {
      const style = document.createElement('style');
      style.id = 'demo-mode-styles';
      style.textContent = `
        /* ========== kintone標準画面 ========== */
        .recordlist-cell-gaia,
        .recordlist-cell-value-gaia,
        .value-gaia,
        .control-value-gaia,
        .control-gaia input,
        .control-gaia textarea,
        .control-gaia select,
        .gaia-argoui-app-titlebar-title-gaia {
          filter: blur(${BLUR_AMOUNT}px);
          user-select: none;
        }
        
        /* ========== カスタマイズビュー共通 ========== */
        /* カード系 */
        .demo-mode .customer-card-name,
        .demo-mode .customer-card-rep,
        .demo-mode .customer-card-info-value,
        .demo-mode .customer-card-revenue-value,
        
        /* モーダル系 */
        .demo-mode .customer-modal-info-value,
        .demo-mode .deal-modal-info-value,
        
        /* フォーム系 */
        .demo-mode .customer-form-input,
        .demo-mode .customer-form-textarea,
        .demo-mode .customer-form-select,
        .demo-mode .deal-form-input,
        .demo-mode .deal-form-textarea,
        .demo-mode .deal-form-select,
        
        /* 履歴系 */
        .demo-mode .customer-minutes-item,
        .demo-mode .customer-proposal-item,
        
        /* ウィザード系 */
        .demo-mode .wizard-contact-item,
        .demo-mode #wizard-selected-contact-info,
        .demo-mode #deal-wizard-customer-display,
        
        /* 汎用クラス */
        .demo-mode .demo-blur {
          filter: blur(${BLUR_AMOUNT}px);
          user-select: none;
        }
        
        /* ========== デモモードバッジ ========== */
        .demo-mode-badge {
          position: fixed;
          top: 10px;
          right: 10px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          z-index: 99999;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .demo-mode-badge::before {
          content: '🔒';
        }
      `;
      document.head.appendChild(style);
    }
    
    // バッジ表示
    if (!document.getElementById('demo-mode-badge')) {
      const badge = document.createElement('div');
      badge.id = 'demo-mode-badge';
      badge.className = 'demo-mode-badge';
      badge.textContent = 'デモモード';
      document.body.appendChild(badge);
    }
    
    // bodyにクラス追加
    document.body.classList.add('demo-mode');
    
    console.log('[Demo Mode] 有効: ユーザー=' + loginUser.code);
    
    return event;
  });
})();
