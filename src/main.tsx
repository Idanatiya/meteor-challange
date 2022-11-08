import React from 'react';
import { createRoot } from 'react-dom/client';

import 'modern-normalize';

import App from './App';
import './main.scss';

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
