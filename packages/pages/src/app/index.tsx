import { createRoot } from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root');

rootElement && createRoot(rootElement).render(<App />);
