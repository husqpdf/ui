<template>
   <HoverCard :openDelay="300">
      <HoverCardTrigger as-child>
         <Button variant="outline" class="h-fit p-2" @click="downloadReport()">
            <FileDown class="size-4" />
         </Button>
      </HoverCardTrigger>
      <HoverCardContent class="w-fit bg-background" :align="'start'">
         <div class="flex w-fit flex-col gap-2">
            <p class="text-sm">Or generate via POST request:</p>
            <div class="rounded border bg-muted p-2 pr-4">
               <span class="font-mono text-xs">
                  <span class="text-primary">curl</span>
                  <span class="text-primary opacity-50"> --request</span> POST \
                  <br />
                  <span class="text-primary opacity-50">--url</span>
                  http://localhost:3000/api/generate/{{ useCurrentDocument() }}
                  \
                  <br />
                  <span class="text-primary opacity-50">--header</span>
                  'Content-Type: application/json' \
                  <br />
                  <span class="text-primary opacity-50">--data</span> '{...}'
               </span>
            </div>
         </div>
      </HoverCardContent>
   </HoverCard>
</template>

<script setup lang="ts">
import {FileDown} from "lucide-vue-next";
import {downloadDocumentResponse} from "@/utils/downloadFile";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {useCurrentDocument} from "@/composables/useCurrentDocument.ts";
import {usePageData} from "@/composables/usePageData.ts";
import {Button} from "@/components/ui/button";

const downloadReport = async () => {
   const response = await fetch(`/api/generate/${useCurrentDocument()}`, {
      method: "POST",
      body: JSON.stringify(usePageData()),
      headers: {
         "Content-Type": "application/json",
      },
   });

   await downloadDocumentResponse(response);
};
</script>

<style scoped></style>
