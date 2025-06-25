declare module 'react-leaflet-markercluster' {
  import { ComponentType } from 'react';
  import { MarkerClusterGroupOptions } from 'leaflet';
  import { LayerGroupProps } from 'react-leaflet';

  export interface MarkerClusterGroupProps extends LayerGroupProps, MarkerClusterGroupOptions {
    children?: React.ReactNode;
    chunkedLoading?: boolean;
  }

  const MarkerClusterGroup: ComponentType<MarkerClusterGroupProps>;
  export default MarkerClusterGroup;
}
