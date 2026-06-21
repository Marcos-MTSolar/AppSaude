package com.marcosesandra.vidasaudavel;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        WebView webView = this.bridge.getWebView();
        if (webView != null) {
            // Limpa o cache atual (disco e memória)
            webView.clearCache(true);
            
            // Força o WebView a não usar cache para requisições futuras
            WebSettings settings = webView.getSettings();
            settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        }
    }
}
