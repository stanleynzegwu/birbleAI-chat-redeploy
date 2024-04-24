import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatStripe, generateUniqueId, loadInterval, loader, typeText } from "@/lib/utils";
import axios from "axios";
import { useRef, useState } from "react";

export default function App() {
  const [hadConversation, setHadConversation] = useState(false);
  const [prompt, setPrompt] = useState("");
  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };
  const chatContainer = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHadConversation(true);
    // user's chatstripe
    chatContainer.current.innerHTML += chatStripe(false, prompt);

    // to clear the textarea input
    setPrompt("");

    // bot's chatstripe
    const uniqueId = generateUniqueId();
    chatContainer.current.innerHTML += chatStripe(true, " ", uniqueId);

    // to focus scroll to the bottom
    chatContainer.current.scrollTop = chatContainer.current.scrollHeight;

    // specific message div
    const messageDiv = document.getElementById(uniqueId);

    // messageDiv.innerHTML = "..."
    loader(messageDiv);

    try {
      const response = await axios.post("http://localhost:5000", { prompt });

      clearInterval(loadInterval);
      messageDiv.innerHTML = " ";

      typeText(messageDiv, response.data.response);
    } catch (error) {
      console.error("Error sending data to server:", error);

      clearInterval(loadInterval);
      messageDiv.innerHTML = " ";
      typeText(messageDiv, "Something went wrong");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   !hadConversation && setHadConversation(true);
  //   // user's chatstripe
  //   chatContainer.current.innerHTML += chatStripe(false, prompt);

  //   // to clear the textarea input
  //   setPrompt("");

  //   // bot's chatstripe
  //   const uniqueId = generateUniqueId();
  //   chatContainer.current.innerHTML += chatStripe(true, " ", uniqueId);

  //   // to focus scroll to the bottom
  //   chatContainer.current.scrollTop = chatContainer.current.scrollHeight;

  //   // specific message div
  //   const messageDiv = document.getElementById(uniqueId);

  //   // messageDiv.innerHTML = "..."
  //   loader(messageDiv);

  //   clearInterval(loadInterval);
  //   messageDiv.innerHTML = " ";

  //   if (true) {
  //     typeText(messageDiv, "hhhhhdh hdhdhd dhtyeye ueue jejeje hehe hehe");
  //   } else {
  //     const err = await response.text();

  //     messageDiv.innerHTML = "Something went wrong";
  //     alert(err);
  //   }
  // };

  return (
    <main className="p-2 md:p-4 flex w-full h-screen bg-[#100F2B] text-white">
      <div className="flex flex-col w-full h-full bg-bg_primary rounded-2xl ">
        <div
          className="relative chat_container flex-1 overflow-scroll p-2 md:p-3"
          ref={chatContainer}
        >
          <div className={`absolute left-0 top-0 w-full h-full flex justify-center items-center  `}>
            <img
              className={`w-60 lg:w-72 xl:w-80 2xl:w-auto object-cover ${
                hadConversation || prompt ? "opacity-0" : "opacity-100"
              }`}
              src="/astronaut1.png"
              alt="astronaut"
            />
          </div>
        </div>
        <form
          className="relative px-2 md:px-3 py-2 md:py-3 h-fit w-full bg-transparent"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 pr-2 py-2 items-center bg-bg_prompt rounded-2xl">
            <Textarea
              name="prompt"
              value={prompt}
              onChange={handleInputChange}
              className="flex-1 bg-transparent pt-[5px]" //added padding to center the input text
              cols={1}
              rows={1}
            />
            <Button className="rounded-xl w-[100px] bg-gradient-to-r from-[#AD07C9] to-[#6335E5]">
              Enter
            </Button>
          </div>

          {/* ABSOLUTELY POSITIONED DIV */}
          <div
            className={`absolute -top-7 left-0 px-3 md:px-4  flex justify-between items-center w-full text-sm md:text-base ${
              prompt || hadConversation ? "hidden" : "flex"
            }`}
          >
            <span className="px-2 ">Enter Prompt</span>
            <div className="flex items-center gap-2 bg-[#1F1F3E] rounded-xl px-2 md:px-4 py-1 border-[1px] border-[#525279] cursor-pointer">
              <img className="w-5 h-5" src="/diceIcon.png" alt="bot" />
              <span>Need ideas for a prompt?</span>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
