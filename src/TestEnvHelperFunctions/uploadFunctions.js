import { log } from "@tensorflow/tfjs-core";

const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
};


export const uploadID = async (image,userId) => {
    const blob = dataURLtoBlob(image);
    const formData = new FormData();
   ; 
    formData.append("id", blob, "captured.jpg");
   
      
   

    
    
    

    try {
        const response = await fetch(`http://localhost:8000/api/upload/id/${userId}`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        console.log("Image uploaded successfully:", data);
    } catch (error) {
        console.error("Error uploading id:", error);
    }
};


export const uploadImage = async (image,userId) => {
    const blob = dataURLtoBlob(image);
    const formData = new FormData();
   
    formData.append("image", blob, "captured.jpg");
   
      
   

    

    try {
        const response = await fetch(`http://localhost:8000/api/upload/image/${userId}`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        console.log("Image uploaded successfully:", data);
    } catch (error) {
        console.log("Error uploading image:", error);
    }
};
