import Image from "next/image";

// lib
import { combineClassNames } from "@src/libs";

type Props = {
  className: string;
  src: string;
  alt?: string;
  priority?: boolean;
  cover?: boolean;
  contain?: boolean;
};

const Photo = ({
  className,
  src,
  alt,
  priority = false,
  cover = false,
  contain = false,
}: Props) => {
  return (
    <figure
      className={combineClassNames("relative", className ? className : "")}
    >
      <Image
        src={src}
        layout="fill"
        className={combineClassNames(
          cover ? "object-cover" : "",
          contain ? "object-contain" : ""
        )}
        alt={alt && "챔피언 이미지"}
        priority={priority}
      />
    </figure>
  );
};

export default Photo;
