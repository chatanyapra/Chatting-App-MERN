import logoImage from "../assets/auramicimage.png";

interface MyComponentProps {
    visibility : boolean;
}

const ChattingStart: React.FC<MyComponentProps> = ({ visibility } : MyComponentProps) => {
  return (
    <div className={`w-full flex justify-center align-middle shadow-md bg-white rounded-xl dark:bg-black max-md:mt-20 max-md:${visibility ? 'visible' : 'hidden'}`}>
      <div className="flex flex-col m-auto w-40 h-40 text-center">
        <img src={logoImage} alt="" />
        <div className="font-bold font-sans text-gray-400">Auramic Website</div>
        <small className="font-semibold font-sans text-gray-400">Send and receive message from friends.</small>
      </div>
    </div>
  )
}

export default ChattingStart
