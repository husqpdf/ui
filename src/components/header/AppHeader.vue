<template>
   <div class="flex h-12 w-full items-center justify-between bg-background">
      <div class="flex items-center gap-2">
         <div class="flex size-8 items-center justify-center rounded border">
            <span class="-translate-y-0.5 text-primary">qp</span>
         </div>
         <p>Husq.pdf</p>
      </div>
      <div class="flex items-center gap-2">
         <ThemeSwitch />
         <DocumentSelect />
      </div>
   </div>
</template>

<script setup lang="ts">
import ThemeSwitch from "./ThemeSwitch.vue";
import DocumentSelect from "./DocumentSelect.vue";
</script>
