<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="relative inline-block text-left">
    <!-- background button -->
    <button v-if="isOpen" @click="isOpen = false" tabindex="-1" class="fixed inset-0 h-full w-full cursor-default z-40"></button>
    <!-- select button -->
    <div>
      <span class="rounded shadow-sm">
        <button type="button" id="options-menu" aria-haspopup="true" aria-expanded="true"
                class="flex-rcc w-full rounded text-xs md:text-base leading-none focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150"
                :class="[classPadding, classBorder, classBgTextColor]"
                @click='isOpen = !isOpen'>
          <span v-if='types && types[curTypeID]'>{{ types[curTypeID].name }}</span>
          <span v-else class="text-gray-300">-- 請選擇 --</span>
          <svg class="ml-2 h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </span>
    </div>
    <!--
      Dropdown panel, show/hide based on dropdown state.

      Entering: "transition ease-out duration-100"
        From: "transform opacity-0 scale-95"
        To: "transform opacity-100 scale-100"
      Leaving: "transition ease-in duration-75"
        From: "transform opacity-100 scale-100"
        To: "transform opacity-0 scale-95"
    -->
    <!-- options -->
    <div v-if='isOpen' class="rounded-md shadow-lg z-50 whitespace-nowrap" :class="classOption">
      <div class="rounded-md bg-white border shadow-xs">
        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <div v-if="!hasOptions"
               class="option text-gray-300"
               :class="[classPadding]">
            {{ noOptionHint }}
          </div>
          <a href="#" role="menuitem"
             class="option"
             :class="[classPadding, classBgTextColor]"
             v-for='(type, id) in types' :key='id' :value='id'
             @click.prevent='onSelect(id)'
          >
            {{ type.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  model: {
    prop: 'curTypeID',
    event: 'change',
  },
  props: {
    curTypeID: [Number, String],
    types: [Object, Array],
    classPadding: {
      type: String,
      default: 'px-4 py-2 md:py-4',
    },
    classBorder: {
      type: String,
      default: 'border border-gray-300 focus:border-blue-300 ',
    },
    classBgTextColor: {
      type: String,
      default: 'bg-white text-gray-700  active:bg-gray-50 active:text-gray-800  hover:bg-gray-100',
    },
    direction: {
      type: String,
      default: 'down',
    },
    noOptionHint: {
      type: String,
      default: '無選項',
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    onSelect(id) {
      this.$emit('change', id);
      this.isOpen = false;
    },
  },
  computed: {
    classOption() {
      return (this.direction === 'up')
        ? 'origin-bottom-left absolute bottom-full left-0 mb-2'
        : 'origin-top-left    absolute top-full    left-0 mt-2';
    },
    hasOptions() {
      if (typeof this.types === 'object') {
        const keys = Object.keys(this.types);
        return !!keys.length;
      }
      if (Array.isArray(this.types)) {
        return !!this.types.length;
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
.option {
  @apply block;
  @apply text-xs md:text-base;
  @apply leading-none;
  @apply focus:outline-none;
  @apply select-none;
}
</style>
