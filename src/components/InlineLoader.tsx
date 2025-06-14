import { FC } from "react";
import { BiLoaderCircle } from "react-icons/bi";

const InlineLoader: FC<{ className?: string }> = ({ className }) => {
   return (
      <BiLoaderCircle
         className={`text-primary-500 animate-spin inline-block ${className || ""
            }`}
      />
   );
};
export default InlineLoader;
