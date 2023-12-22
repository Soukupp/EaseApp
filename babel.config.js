module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
   plugins: [
      [
        'module-resolver',
        {
          alias: {
            '*': ['./assets'],
          },
        },
    
      ],
      'react-native-reanimated/plugin',   // react-native-reanimated/plugin必须在最后
    ],

};
