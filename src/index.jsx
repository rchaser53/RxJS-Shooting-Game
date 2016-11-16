import React from 'react';
import reactDom from 'react-dom';

import { Provider } from 'react-redux'
import store from './store';

import OutSide from './component/Outside';

reactDom.render(<Provider store={store}><OutSide /></Provider>,
				document.getElementById("shootingArea"));