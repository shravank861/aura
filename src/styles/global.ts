import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #f3f5f8;
    --panel: #ffffff;
    --panelBorder: #e6eaf0;
    --text: #1f2937;
    --muted: #6b7280;
    --brand: #4f46e5;
    --brandDark: #4338ca;
    --brandSoft: #eef2ff;
    --accent: #0ea5e9;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background: radial-gradient(600px 300px at 10% -20%, #e9eef8 0%, transparent 40%),
                radial-gradient(700px 400px at 90% -30%, #e9f9ff 0%, transparent 45%),
                var(--bg);
    color: var(--text);
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;


