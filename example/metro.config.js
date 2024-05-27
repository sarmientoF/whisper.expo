/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const escape = require('escape-string-regexp')
const exclusionList = require('metro-config/src/defaults/exclusionList')

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const defaultAssetExts = require('metro-config/src/defaults/defaults').assetExts
const pak = require('../package.json')

const root = path.resolve(__dirname, '.')

// const modules = Object.keys({
//   ...pak.peerDependencies,
// })

const config = {
  projectRoot: __dirname,
  watchFolders: [root],

  // We need to make sure that only one version is loaded for peerDependencies
  // So we block them at the root, and alias them to the versions in example's node_modules
  resolver: {
    assetExts: [
      ...defaultAssetExts,
      'bin', // ggml model binary
      'mil', // CoreML model asset
    ],
  },

  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config)
