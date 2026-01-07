/**
 * kintone デモモード共通スクリプト
 * partner ユーザーでログイン時、データ部分をぼかす
 * 
 * 使用方法：
 * 各アプリのJavaScriptカスタマイズに以下URLを追加
 * https://cdn.jsdelivr.net/gh/YOUR_USERNAME/kintone-common-js/demo-mode.js
 */
(function() {
  'use strict';
  
  // ========== 設定 ==========
  // デモモード対象ユーザーのログイン名
  const DEMO_USERS = ['partner'];
  
  // ぼかしの強さ（px）
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
        /* ========== kintone標準画面のぼかし ========== */
        /* 一覧画面 */
        .recordlist-cell-gaia,
        .recordlist-cell-value-gaia {
          filter: blur(${BLUR_AMOUNT}px);
          user-select: none;
        }
        
        /* 詳細・編集画面 */
        .value-gaia,
        .control-value-gaia,
        .control-gaia input,
        .control-gaia textarea,
        .control-gaia select {
          filter: blur(${BLUR_AMOUNT}px);
          user-select: none;
        }
        
        /* ヘッダーのレコード情報 */
        .gaia-argoui-app-titlebar-title-gaia {
          filter: blur(${BLUR_AMOUNT}px);
        }
        
        /* ========== カスタマイズビュー用（汎用クラス） ========== */
        .demo-blur {
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
    
    // バッジ表示（1回だけ）
    if (!document.getElementById('demo-mode-badge')) {
      const badge = document.createElement('div');
      badge.id = 'demo-mode-badge';
      badge.className = 'demo-mode-badge';
      badge.textContent = 'デモモード';
      document.body.appendChild(badge);
    }
    
    // bodyにクラス追加（カスタマイズビューで使用可能）
    document.body.classList.add('demo-mode');
    
    console.log('[Demo Mode] 有効: ユーザー=' + loginUser.code);
    
    return event;
  });
})();
