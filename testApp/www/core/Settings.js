var CSettings = {
      settings: {},
      set: function(key,value){
          CSettings.settings[key] = value;
      },
      get: function(key){
          return CSettings.settings[key];
      },
      initialize: function(){
          CSettings.set('appID','5449072330b94e0200ff4123');
      }
    }
    CSettings.initialize();