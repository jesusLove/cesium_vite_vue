<script setup>
import { ref, onMounted } from "vue";
import { TileMapServiceImageryProvider, Viewer, buildModuleUrl } from "cesium";
import "cesium/Build/CesiumUnminified/Widgets/widgets.css";

const viewerDivRef = ref();
window.CESIUM_BASE_URL = 'libs/cesium/';

onMounted(() => {
  new Viewer(viewerDivRef.value, {
    imageryProvider: new TileMapServiceImageryProvider({
      url: 'libs/cesium/Assets/Textures/NaturalEarthII'
    }),
  });
});
</script>

<template>
  <div id="cesium-viewer" ref="viewerDivRef"></div>
</template>

<style scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;
}
</style>
