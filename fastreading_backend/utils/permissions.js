const PERMISSIONS = {
    VIEW_HISTORY: 'view_history',
    PLAY_SPEEDREADER: 'play_speedreader',
    PLAY_PHOTOGAME: 'play_photogame',
    PLAY_CONCENTRATION: 'play_concentration',
  };
  
  const PERMISSIONS_DESCRIPTIONS = {
    [PERMISSIONS.VIEW_HISTORY]: 'Puede ver su historial',
    [PERMISSIONS.PLAY_SPEEDREADER]: 'Puede jugar lectura rápida',
    [PERMISSIONS.PLAY_PHOTOGAME]: 'Puede jugar memoria fotográfica',
    [PERMISSIONS.PLAY_CONCENTRATION]: 'Puede jugar concentración',
  };
  
  module.exports = { PERMISSIONS, PERMISSIONS_DESCRIPTIONS };
  