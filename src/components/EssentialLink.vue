
<script lang="ts">
import { createComponent } from '@vue/composition-api';
import * as EssentialLinkVueModel from './EssentialLinkViewModel';

export default createComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const vm = EssentialLinkVueModel.create(props.title, props.link, true);

    return { ...vm  };
  }
})
</script>

<template>
  <q-item clickable tag="a" target="_blank" :href="transformedUrl">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label :style="style">{{ transformedString }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
