import React, { useCallback, useState, useRef, useEffect } from "react";
import Link from "next/link";
import Webcam from "react-webcam";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function openCamera() {
  const webCamRef = useRef();
  const [imageSrc, setImageSrc] = useState();
  const [showImage, setShowImage] = useState();
  const imageName = uuidv4();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  var rawData = [];
  var status = 0;

  console.log(process.env.NEXT_PUBLIC_S3_BUCKET, "to get the bucket");
  const S3_BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET;
  const REGION = process.env.NEXT_PUBLIC_REGION;

  const capture = useCallback(() => {
    const imageSrc = webCamRef?.current?.getScreenshot();
    setImageSrc(imageSrc);
    // console.log(JSON.stringify(imageSrc), "to get the image stringgy");
    localStorage.setItem("imageSrc", imageSrc);
    const replaceimage = imageSrc.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(replaceimage, "base64");
    console.log(buffer);
    setShowImage(buffer);
  }, [webCamRef]);

  const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS__KEY,
    region: REGION,
  });

  const rekognition = new AWS.Rekognition({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS__KEY,
    region: REGION,
  });

  const handleImageUpload = async () => {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: `${imageName}.png`,
      Body: showImage,
      collectionId: "p2p",
      ContentEncoding: "base64",
      ContentType: "image/png",
    };
    console.log(params.Key, "to get the value of params");

    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data.Location);
        console.log(data);
      }
    });
  };

  const handleUploadClick = () => {
    if (imageSrc) {
      handleImageUpload(imageSrc);
      localStorage.setItem("tabs", false);
      setTimeout(() => {
        router.push("/tabsLink");
      }, [1000]);
    }
  };

  async function faceImpression(data) {
    let res = await axios.post("/api/faceImpression", data);
    const response = res.data;
    console.log(response, "to get response from api ");
    localStorage.setItem("tabs", true);
    setTimeout(() => {
      router.push("/tabsLink");
    }, [1000]);
  }

  async function formSubmitHandler() {
    // event.preventDefault();

    const data = {
      faceImpression: content.Key,
    };
    console.log(data, "to send data for face Check");
    faceImpression(data);
  }

  async function closeImage() {
    setImageSrc(null);
    return;
  }

  async function getImageData() {
    setOpen(true);
    try {
      const params = {
        SourceImage: {
          Bytes: showImage,
        },
        SimilarityThreshold: 90,
      };

      const data = await s3.listObjectsV2({ Bucket: "tricepay" }).promise();
      let counter = 0;

      for (let i = 0; i < data.Contents.length; i++) {
        const content = data.Contents[i];
        const paramsWithTarget = Object.assign({}, params, {
          TargetImage: {
            S3Object: {
              Bucket: "tricepay",
              Name: content.Key,
            },
          },
        });
        console.log(content.Key, "to check the content");
        localStorage.setItem("contentKey", content.Key);

        status = await rek(paramsWithTarget, params, content);
        counter++;
        console.log(counter, "counter");
        console.log(data.Contents.length, "length");
        console.log(status, "status");
        if (counter === data.Contents.length) {
          if (status === 0) {
            console.log("upload");
            handleUploadClick();
          }
        }

        if (status === 1) {
          console.log("api");
          let res = await axios.post("/api/faceImpression", {
            faceImpression: content.Key,
          });
          const response = res.data;
          console.log(response, "to get response from api ");
          localStorage.setItem("tabs", true);
          setTimeout(() => {
            router.push("/tabsLink");
          }, [1000]);
          break;
        } else {
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  // console.log(status, "hi its me");

  async function rek(paramsWithTarget, params, content) {
    try {
      setOpen(true);
      const data = await rekognition.compareFaces(paramsWithTarget).promise();

      if (
        data.FaceMatches.length > 0 &&
        data.FaceMatches[0].Similarity > params.SimilarityThreshold
      ) {
        console.log(
          `Match found with ${content.Key}. Similarity score: ${data.FaceMatches[0].Similarity}`
        );
        return 1;
      } else {
        console.log("no match found");
        return 0;
      }
      setOpen(false);
    } catch (err) {
      console.log(err);
      return -1;
    }
  }

  useEffect(() => {
    console.log(rawData, "raw data dljsn");
  });

  return (
    <section class="camera">
      <ToastContainer />
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
                mirrored={true}
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
              <div className="refrence-button" id="captureDivID">
                <button
                  className="next"
                  type="button"
                  onClick={closeImage}
                  style={{ marginTop: "30px" }}
                >
                  Retake
                </button>
                <button
                  className="next"
                  type="button"
                  onClick={getImageData}
                  style={{ marginTop: "30px" }}
                >
                  Submit
                </button>
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
