import Image from "next/image";

const LogoSection = () => {
  return (
    <div className="h-10 w-auto">
      <Image
        alt="logo"
        src={'/logo.png'}
        width={40}
        height={40}
        className="w-full h-full object-contain"
      />

    </div>
  );
};

export default LogoSection;
