import React, { useCallback, useState, useRef } from "react";
import Link from "next/link";
import Webcam from "react-webcam";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function openCamera() {
  const webCamRef = useRef();
  const [imageSrc, setImageSrc] = useState();
  const imageName = uuidv4();
  const router = useRouter();

  console.log(process.env.NEXT_PUBLIC_S3_BUCKET, "to get the bucket");
  const S3_BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET;
  const REGION = process.env.NEXT_PUBLIC_REGION;

  const capture = useCallback(() => {
    const imageSrc = webCamRef?.current?.getScreenshot();
    console.log(imageSrc);
    setImageSrc(imageSrc);
    localStorage.setItem("image", imageSrc);
  }, [webCamRef]);

  const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS__KEY,
    region: REGION,
  });

  const handleImageUpload = async (imageSrc) => {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: `imageSrc/${imageName}.jpg`,
      Body: imageSrc,
      ContentType: imageSrc.type,
    };
    // console.log(Key, "to see the image name");
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data.Location);
        console.log(data);
      }
    });
  };

  // const handleFileChange = (e) => {
  //   console.log(e, "event");
  //   setFile(e.target.files[0]);
  // };

  const handleUploadClick = () => {
    if (imageSrc) {
      handleImageUpload(imageSrc);
      toast.success("Image Has been uploaded successfully");
      router.push("/tabsLink");
    }
  };

  async function closeImage() {
    setImageSrc(null);
    return;
  }

  return (
    <section class="camera">
      <ToastContainer />
      <div class="container">
        <div class="camera-image">
          {imageSrc ? (
            ""
          ) : (
            <div className="cameraFirstPart">
              <Webcam
                ref={webCamRef}
                screenshotFormat="image/jpeg"
                audio={false}
                className="imageSetting"
                // height={320}
                // width={640}
              />
              <div className="captureDiv">
                <button
                  className="btn connect-wallet"
                  onClick={capture}
                  type="submit"
                >
                  Capture
                </button>
              </div>
            </div>
          )}

          {imageSrc ? (
            <div className="cameraFirstPart">
              <img className="imageSetting" src={imageSrc} />
              <div className="captureDiv" id="captureDivID">
                <img src="/close.png" onClick={closeImage}></img>

                <img src="/siglecheck.png" onClick={handleUploadClick}></img>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
}



// import React, { useCallback, useState, useRef, useEffect } from "react";
// import Webcam from "react-webcam";
// import AWS from "aws-sdk";
// import { v4 as uuidv4 } from "uuid";
// import { useRouter } from "next/router";

// export default function openCamera() {
//   const webCamRef = useRef();
//   const [imageSrc, setImageSrc] = useState();
//   const [showImage, setShowImage] = useState();
//   const imageName = uuidv4();
//   const router = useRouter();

//   var rawData = [];

//   console.log(process.env.NEXT_PUBLIC_S3_BUCKET, "to get the bucket");
//   const S3_BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET;
//   const REGION = process.env.NEXT_PUBLIC_REGION;

//   const capture = useCallback(() => {
//     const imageSrc = webCamRef?.current?.getScreenshot();
//     setImageSrc(imageSrc);
//     console.log(JSON.stringify(imageSrc), "to get the image stringgy");
//     localStorage.setItem("imageSrc", JSON.stringify(imageSrc));
//     const replaceimage = imageSrc.replace(/^data:image\/\w+;base64,/, "");
//     const buffer = Buffer.from(replaceimage, "base64");
//     console.log(buffer);
//     setShowImage(buffer);
//   }, [webCamRef]);

//   const s3 = new AWS.S3({
//     accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS__KEY,
//     region: REGION,
//   });

//   const rekognition = new AWS.Rekognition({
//     accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS__KEY,
//     region: REGION,
//   });

//   const handleImageUpload = async () => {
//     const params = {
//       Bucket: S3_BUCKET_NAME,
//       Key: `${imageName}.png`,
//       Body: showImage,
//       collectionId: "p2p",
//       // ChecksumAlgorithm: "SHA256",
//       ContentEncoding: "base64",
//       ContentType: "image/png",
//       // ACL: 'public-read',
//     };

//     // console.log(Key, "to see the image name");
//     s3.upload(params, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(data.Location);
//         console.log(data);
//       }
//     });
//   };

//   const handleUploadClick = () => {
//     if (imageSrc) {
//       handleImageUpload(imageSrc);
//       // router.push("/collectionFaceScan");
//     }
//   };

//   async function closeImage() {
//     setImageSrc(null);
//     return;
//   }

//   async function getImageData() {
//     try {
//       console.log("first");
//       const params = {
//         SourceImage: {
//           Bytes: showImage,
//         },
//         SimilarityThreshold: 90,
//       };
  
//       // console.log(params);
  
//       // Loop through each object in the S3 bucket
//       s3.listObjectsV2({ Bucket: "tricepay" }, (err, data) => {
//         if (err) {
//           console.log(err, err.stack);
//         } else {
//           data.Contents.forEach(async(content) => {
//             const paramsWithTarget = Object.assign({}, params, {
//               TargetImage: {
//                 S3Object: {
//                   Bucket: "tricepay",
//                   Name: content.Key,
//                 },
//               },
//             });
  
//             // Invoke the CompareFaces API
//             await rek(paramsWithTarget,params,content, (key,confidence) => {
//               console.log(key, confidence,"hiihihihihihi");
//             });
//           });
//         }
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }
  
//   async function rek(paramsWithTarget,params,content,callback){
//     try {
//       rekognition.compareFaces(paramsWithTarget, (err, data) => {
//         if (err) {
//           console.log(err, err.stack);
//         } else {
//           // If the similarity score is above the threshold, consider the faces a match
//           if (
//             data.FaceMatches.length > 0 &&
//             data.FaceMatches[0].Similarity > params.SimilarityThreshold
//           ) {
//             console.log(
//               `Match found with ${content.Key}. Similarity score: ${data.FaceMatches[0].Similarity}`
//               );
//               let key = content.Key
//               let confidence = data.FaceMatches[0].Similarity
//               callback(key, confidence);
//           }
//           else {
//             handleUploadClick();
//             console.log("no match found");
//           }
//         }
//       });
//     } catch (err) {
      
//     }
//   }
//   useEffect(() => {
//     console.log(rawData, "raw data dljsn");
//   });

//   return (
//     <section className="camera">
//       <div className="container">
//         <div className="camera-image">
//           {imageSrc ? (
//             ""
//           ) : (
//             <div className="cameraFirstPart">
//               <Webcam
//                 ref={webCamRef}
//                 screenshotFormat="image/jpeg"
//                 audio={false}
//                 className="imageSetting"
//                 // height={320}
//                 // width={640}
//               />
//               <div className="captureDiv">
//                 <button
//                   className="btn connect-wallet"
//                   onClick={capture}
//                   type="submit"
//                 >
//                   Capture
//                 </button>
//               </div>
//             </div>
//           )}

//           {showImage ? (
//             <div className="cameraFirstPart">
//               <img className="imageSetting" src={imageSrc} />
//               <div className="captureDiv" id="captureDivID">
//                 <img src="/close.png" onClick={closeImage}></img>

//                 <img src="/siglecheck.png" onClick={getImageData}></img>
//               </div>
//             </div>
//           ) : (
//             ""
//           )}
//           {/* <div className="captureImageDiv">
//             <img
//             src={imageSrc} />
//           </div> */}
//         </div>
//       </div>
//     </section>
//   );
// }
