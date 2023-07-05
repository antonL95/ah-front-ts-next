"use client";

import { Spoiler } from "@mantine/core";
import PlusButton from "@/ah/components/ui/icon/PlusButton";
import MinusButton from "@/ah/components/ui/icon/MinusButton";

type Props = {
  content: string;
  maxHeight: number;
  className?: string;
  strokeColor: string;
};
const SpoilerExtension = ({
  content,
  className,
  maxHeight,
  strokeColor = "white",
}: Props) => {
  return (
    <Spoiler
      className={className}
      maxHeight={maxHeight}
      hideLabel={<MinusButton strokeColor={strokeColor} className={`mt-4`} />}
      showLabel={<PlusButton strokeColor={strokeColor} className={`mt-4`} />}
    >
      {content}
    </Spoiler>
  );
};

export default SpoilerExtension;
