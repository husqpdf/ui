import {useCurrentDocument} from "@/composables/useCurrentDocument.ts";

export const downloadDocumentResponse = async (response: Response) => {
   const blob = await response.blob();
   const url = window.URL.createObjectURL(blob);
   const contentDisposition = response.headers.get("Content-Disposition");

   let fileName = determineFileName(contentDisposition);

   const a = document.createElement("a");
   a.href = url;
   a.download = fileName;

   document.body.appendChild(a);
   a.click();
   a.remove();
   window.URL.revokeObjectURL(url);
};

function determineFileName(contentDisposition: string | null) {
   let fileName = `${useCurrentDocument()}.pdf`; // Default file name
   if (contentDisposition && contentDisposition.indexOf("attachment") !== -1) {
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      if (fileNameMatch?.length === 2) {
         fileName = fileNameMatch[1];
      }
   }
   return fileName;
}
