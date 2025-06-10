import React, { useRef, useState, useEffect } from "react";
import * as S from "./style";
import TakeBtn from "../TakeBtn";
import * as bodyPix from "@tensorflow-models/body-pix";
import * as tf from "@tensorflow/tfjs";
import { usePhotoStore } from "../../../store/PhotoInfo";

const PhotoBooth = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const setPhoto = usePhotoStore((state) => state.actions.setPhoto);
  const photo = usePhotoStore((state) => state.photo);
  const bg = usePhotoStore((state) => state.bgPhoto);
  const [takeCnt, setTakeCnt] = useState(0);
  const [cnt, setCnt] = useState(null);

  useEffect(() => {
    const loadBodyPix = async () => {
      await tf.setBackend("webgl");
      await tf.ready();
      const net = await bodyPix.load();

      const processWebcam = async () => {
        if (
          webcamRef.current &&
          webcamRef.current.video.readyState === 4 &&
          canvasRef.current
        ) {
          const video = webcamRef.current.video;

          const segmentation = await net.segmentPerson(video);

          const mask = bodyPix.toMask(
            segmentation,
            { r: 0, g: 0, b: 0, a: 255 },
            { r: 0, g: 0, b: 0, a: 0 }
          );

          const canvas = canvasRef.current;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const ctx = canvas.getContext("2d");

          const img = new Image();
          img.src = bg;
          img.onload = () => {
            ctx.putImageData(mask, 0, 0);

            ctx.globalCompositeOperation = "source-in";
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = "destination-over";
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = "source-over";
          };
        }
        requestAnimationFrame(processWebcam);
      };

      processWebcam();
    };

    loadBodyPix();
  }, []);

  const captureHandle = () => {
    if (takeCnt > 1 || cnt !== null) return;

    let countdown = 3;
    setCnt(countdown);

    const timer = setInterval(() => {
      countdown -= 1;
      if (countdown === 0) {
        clearInterval(timer);
        const img = canvasRef.current.toDataURL("image/jpeg"); // 캔버스에서 캡처
        setPhoto(takeCnt, img);
        setTakeCnt((prev) => prev + 1);
        setCnt(null);
        console.log(photo);
      } else {
        setCnt(countdown);
      }
    }, 1000);
  };

  return (
    <S.BoothWrapper>
      <S.Camera mirrored={true} ref={webcamRef}/>
      <S.Canvas ref={canvasRef} />
      <S.cntNum>{cnt !== null ? cnt : ""}</S.cntNum>
      <TakeBtn onClick={captureHandle} />
    </S.BoothWrapper>
  );
};

export default PhotoBooth;
