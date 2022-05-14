import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
import * as webpack from 'webpack';

export default (
  config: webpack.Configuration,
  options: CustomWebpackBrowserSchema,
  targetOptions: TargetOptions
) => {
  config.module.rules.push({
    resourceQuery: /raw/,
    type: 'asset/source',
  });

  return config;
};
