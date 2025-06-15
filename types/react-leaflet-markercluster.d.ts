declare module "@changey/react-leaflet-markercluster" {
  import { ComponentType } from "react";
  import { MarkerClusterGroupOptions } from "leaflet";
  import { LayerGroupProps } from "react-leaflet";

  /** Minimal prop set we rely on (`chunkedLoading` etc.). */
  export interface MarkerClusterGroupProps
    extends LayerGroupProps,
      MarkerClusterGroupOptions {
        chunkedLoading?: boolean;
      }

  const MarkerClusterGroup: ComponentType<MarkerClusterGroupProps>;
  export default MarkerClusterGroup;
}
