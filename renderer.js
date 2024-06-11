const { webFrame } = require('electron');

webFrame.setZoomFactor(1);

webFrame.setVisualZoomLevelLimits(1, 1);
