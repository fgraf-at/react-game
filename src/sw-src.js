import {precacheAndRoute} from 'workbox-precaching';

// Hierdurch werden beim Build-Prozess generierte Assets vorgecached.
precacheAndRoute(self.__WB_MANIFEST);
