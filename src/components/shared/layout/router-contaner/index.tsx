import React from 'react';
import { renderRoutes } from 'react-router-config';

/**
 * Created by vntopmas@gmail.com
 * Email: vntopmas@gmail.com
 **/
export const RouteContainer = ({ route }) => {

  return <>{renderRoutes(route?.routes)}</>;
};
