import { Skeleton } from "moti/skeleton";
import React, { useState } from "react";
import { useDelayCallback } from "../../hooks";

const DelayedSkeleton = ({ ...props }) => {
  const [enableAnimation, setShowEnableAnimation] = useState(false);
  useDelayCallback({
    callback: () => setShowEnableAnimation(true),
    duration: 500,
  });

  return enableAnimation && <Skeleton {...props} />;
};

export default DelayedSkeleton;
