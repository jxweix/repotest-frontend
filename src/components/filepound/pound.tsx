
// npm install react-filepond filepond --save
import React, { useState, useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// import FilePondPluginFileEncode from "filepond-plugin-file-encode";
// import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
// import FilePondPluginImageResize from "filepond-plugin-image-resize";
// import FilePondPluginImageCrop from "filepond-plugin-image-crop";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  //   FilePondPluginFileEncode,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  //   FilePondPluginImageResize,
  //   FilePondPluginImageCrop,
  //   FilePondPluginImageTransform
);
// Our app
export function FilePondComponent() {
  const [files, setFiles] = useState([]);
  // console.log("files", files);
  let pond:any = null;

  const onSubmit = () => {
    const formData = new FormData();
    // files
    //   .map((item) => item.file)
    //   .forEach((file) => formData.append("my-file", file));
    // console.log(formData);
    console.log("pond", pond);

    if (pond) {
      // pond.setOptions({
      //   server: {
      //     url: "https://httpbin.org/post",
      //     timeout: 7000
      //     // process: {
      //     //   url: "./process",
      //     //   method: "POST",
      //     //   headers: {
      //     //     "x-customheader": "Hello World"
      //     //   },
      //     //   withCredentials: false,
      //     //   onload: (response) => response.key,
      //     //   onerror: (response) => response.data,
      //     //   ondata: (formData) => {
      //     //     formData.append("Hello", "World");
      //     //     return formData;
      //     //   }
      //     // },
      //     // revert: "./revert",
      //     // restore: "./restore/",
      //     // load: "./load/",
      //     // fetch: "./fetch/"
      //   }
      // });

      const files = pond.getFiles();
      files.forEach((file:any) => {
        console.log("each file", file, file.getFileEncodeBase64String());
      });

      pond
        .processFiles(files)
        .then((res:any) => console.log(res))
        .catch((error:any) => console.log("err", error));
    }
  };

  return (
    <div className="App">
      <FilePond
        credits={false}
        files={files}
        ref={(ref) => {
          pond = ref;
        }}
        required
        acceptedFileTypes={["application/pdf", "image/*"]}
        fileValidateTypeDetectType={(source, type) =>
          // Note: we need this here to activate the file type validations and filtering
          new Promise((resolve, reject) => {
            // Do custom type detection here and return with promise
            resolve(type);
          })
        }
        // allowFileEncode
        // allowImageTransform
        imagePreviewHeight={400}
        // imageCropAspectRatio={"1:1"}
        // imageResizeTargetWidth={100}
        // imageResizeTargetHeight={100}
        // imageResizeMode={"cover"}
        // imageTransformOutputQuality={50}
        // imageTransformOutputQualityMode="optional"
        // imageTransformBeforeCreateBlob={(canvas: any) =>
        //   new Promise((resolve) => {
        //     // Do something with the canvas, like drawing some text on it
        //     const ctx = canvas.getContext("2d");
        //     ctx.font = "48px serif";
        //     ctx.fillText("Hello world", 10, 50);

        //     console.log("imageTransformBeforeCreateBlob", ctx, canvas);

        //     // return canvas to the plugin for further processing
        //     resolve(canvas);
        //   })
        // }
        // imageTransformAfterCreateBlob={(blob: any) =>
        //   new Promise((resolve) => {
        //     // do something with the blob, for instance send it to a custom compression alogrithm
        //     console.log("imageTransformAfterCreateBlob", blob);

        //     // return the blob to the plugin for further processing
        //     resolve(blob);
        //   })
        // }
        // onupdatefiles={setFiles}
        instantUpload={false}
        allowMultiple={true}
        maxFiles={3}
        server="https://httpbin.org/post"
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
}