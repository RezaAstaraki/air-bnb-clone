"use client";
import CustomButton from "../forms/CustomButton";

const ConversationDetail = () => {
  return (
    <>
      <div className="max-h-[400px] overflow-auto flex-col space-y-4">
        <div className="w-[80%] py-4 px-6 rounded-xl bg-gray-200">
          <p className="font-bold text-gray-500">John Doe</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,
            ducimus!
          </p>
        </div>
        <div className="w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-blue-200">
          <p className="font-bold text-gray-500">John sss</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,
            ducimus!
          </p>
        </div>
      </div>

      <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl ">
        <input
          placeholder="Type your message..."
          type="text"
          name=""
          id=""
          className="w-full p-2 bg-gray-200 rounded-xl"
        />

        <CustomButton
          onClick={() => console.log("clicked")}
          label="send"
          className="w-[100px]"
        />
      </div>
    </>
  );
};

export default ConversationDetail;
