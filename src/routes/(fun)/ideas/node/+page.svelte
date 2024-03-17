<script lang="ts">
  import type { PageData } from './$types';  
  export let data: PageData;
  
  import { writable, derived } from 'svelte/store';
  import { SvelteFlow } from '@xyflow/svelte';

  import ColorPickerNode from "$lib/fun/ColorPickerNode.svelte"
  import ColorPickerInput from "$lib/fun/ColorPickerInput.svelte"

  // import '@xyflow/svelte/dist/style.css';
  import '@xyflow/svelte/dist/base.css';


  const nodes = writable([
    {
      id: '1',
      type: 'colorPickerInput',
      data: { color: writable('#095845') },
      position: { x: 0, y: 0 },
    },
    {
      id: '2',
      type: 'colorPicker',
      data: { color: writable('#ffffff') },
      position: { x: 200, y: 0 },
    }
  ]);

  const edges = writable([
    { id: '1-2', source: '1', target: '2' },
  ]);

  const defaultEdgeOptions = {
    animated: true,
    type: 'smoothstep'
  };

  const nodeTypes = {
    colorPicker: ColorPickerNode,
    colorPickerInput: ColorPickerInput
  };

  $: colorA = $nodes[0].data.color;
  $: colorB = $nodes[1].data.color;
  let style = "background: color-mix(in srgb, " + {$colorA} + "," + {$colorB} + ");";

  $: console.log("colorA", $colorA);

  $: {
    // Check for edge connections whenever $edges changes
    const connectedEdges = $edges.filter(edge => edge.source && edge.target);

    // If there are any connected edges, execute further logic
    if (connectedEdges.length > 0) {
      console.log("Edge connections detected:", connectedEdges);
      let colorAStr = $colorA.toString();
      let colorBStr = $colorB.toString();

      console.log("colorAStr", colorAStr);
      console.log("colorBStr", colorBStr);
      
      style = "background: color-mix(in srgb, " + colorAStr + "," + colorBStr + ");";
  
    } else {
      style = "background: transparent;";
      console.log("No edge connections detected");
    }
  }
</script>

<div style="height:100vh;">
  <div class="bg" style={style}>

  </div>
  <div class="flow">
  <SvelteFlow
    {nodes}
    {edges}
    {nodeTypes}
    {defaultEdgeOptions}
    fitView
    style="background: transparent"
    attributionPosition="top-right"
  />
  </div>
</div>

<style lang="scss">

  .flow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;

  }

  .bg {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
</style>