import Image from "next/image";

const LogoSection = () => {
  return (
    <div className="h-10 relative">
      <Image
        src="/logo.svg"
        fill
        alt="futsal logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default LogoSection;
