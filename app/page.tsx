
import exp from "constants";
import { Rubik, Afacad } from "next/font/google";
import Image from "next/image";

const titleFont = Rubik({
  subsets: ['latin'],
  weight: 'variable',
});
const bodyFont = Afacad({
  subsets: ['latin'],
  weight: 'variable',
});
export default function Home() {
  return (
    <main className="w-screen h-screen bg-gradient-to-r from-red-100 to-purple-100 via-blue-100 bg-size-200 animate-gradient-move flex justify-center items-center">

      {/* <div className="container"> */}
      <div className="w-full flex flex-col absolute left-[-30%]">
        <nav className="w-full h-full flex justify-center ">
          <ul className={`${titleFont.className} flex flex-col pr-5 pl-5`}>
            <li >
              <a href="https://huggingface.co/spaces/shlok123/imageColorization" target="_blank" className="text-black p-5 font-thin flex justify-between items-center rounded-3xl hover:bg-white/30 hover:backdrop-blur-lg hover:shadow-xl transition duration-300 ease-in-out">
              Image Colorization <span className="text-[#92989F]  pl-9">2023</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-black p-5 flex font-thin justify-between items-center hover:bg-white/30 hover:backdrop-blur-lg hover:shadow-xl transition duration-300 ease-in-out rounded-3xl">
              Text Classification <span className="text-[#92989F]  pl-9">2023</span>
              </a>
            </li>
            <li >
              <a href="#" className="p-5 text-black flex font-thin justify-between items-center hover:bg-white/30 hover:backdrop-blur-lg hover:shadow-xl transition duration-300 ease-in-out rounded-3xl">
              Satelite Image Segmentation <span className="text-[#92989F]  pl-9">2023</span>
              </a>
            </li>
        
          </ul>
        </nav>
      </div>
      <div className="w-full h-full flex flex-col fixed inset-x-0 left-1/2 top-1/2 transform translate-x-[-50px] translate-y-[-50px]">
          <h1 className={`${bodyFont.className} text-black font-bold text-3xl`}>Shlok Koirala,</h1>
          <span className={`${bodyFont.className} text-black font-bold text-3xl mt-1`}>
              your <span className="inline-block bg-gradient-to-tr from-purple-700 to-pink-400 bg-clip-text text-transparent">CUTEST AI/ML</span>  developer
          </span>
          <span className="flex pt-3">
          <a href="#" target="_blank"><span className={`${titleFont.className} text-md text-[#92989F] font-thin pr-5`}>About</span></a>
          
          <a href="https://www.linkedin.com/in/shlok-koirala-2aabb51b6/" target="_blank">
          <span className={`${titleFont.className} font-thin text-md text-[#92989F] pr-5`}>LinkedIn</span>
          </a>
          
          <a href="https://github.com/shlok-py" target="_blank">
          <span className={`${titleFont.className} text-md font-thin text-[#92989F] pr-5`}>GitHub</span>
          </a>
          
          <a href="https://x.com/koirala_shlok" target="_blank">
          <span className={`${titleFont.className} text-md text-[#92989F] font-thin pr-5`}>X</span>
          </a>
          </span>
        </div>
      {/* </div> */}

    </main>
  );
}
