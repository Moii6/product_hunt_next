import useFirebase from "@/firebase/useFirebase";
import React, { Fragment, useEffect, useState } from "react";

const ProgressBar = ({ running }) => {
  const [filled, setFilled] = useState(5);
  const [isRuning, setIsRunning] = useState(false);
  const { setLoadImage } = useFirebase();

  useEffect(() => {
    console.log("useEffect del progress bar filled");
    if (filled < 105 && isRuning) {
      setTimeout(() => {
        setFilled(filled + 5);
      }, 100);
    } else {
      setIsRunning(false);
      setFilled(0);
      setLoadImage(false);
    }
  }, [filled]);
  useEffect(() => {
    console.log("useEffect del progress bar running");
    if (running) {
      setFilled(5);
      setIsRunning(true);
    }
  }, [running]);

  if (!isRuning) {
    return;
  } else
    return (
      <Fragment>
        <div className=" mt-5 w-full bg-gray-200 rounded-full h-2.5 mb-4 ">
          <div
            className="bg-orange-600 h-2.5 rounded-full "
            style={{ width: `${filled}%` }}
          ></div>
        </div>
      </Fragment>
    );
};

export default ProgressBar;
