/* eslint-disable @typescript-eslint/no-explicit-any */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import userImage from "../../assets/image/user-image.webp"

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";


const dummyData = [
  { id: 1, name: "Ayesha Rahman, Rider", description: "This app made my daily commute so much easier! The rides are quick, affordable, and the drivers are very professional." },
  { id: 2, name: "Mehedi Hasan, Driver", description: "I love the flexibility of being a driver. I can go online whenever I want and earn extra income. The app is super easy to use." },
  { id: 3, name: "Shamim Chowdhury, Rider", description: "Safety is my first concern. I feel very secure knowing that all drivers are verified and there’s an SOS button in case of emergency" },
  { id: 4, name: "Tania Alam, Rider", description: "Finally a ride-sharing app I can trust. The driver arrived on time and the fare was exactly as estimated. No surprises!" },
  { id: 5, name: "Rakibul Islam, Driver", description: "The earning dashboard is a game-changer. I can see my daily, weekly, and monthly income at a glance." },
  { id: 6, name: "Nusrat Jahan, Rider", description: "I travel late at night often, and the SOS button plus trusted contact notification gives me peace of mind." },
];

const chunkArray = (arr: any[], size: number) => {
  return arr.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, [] as any[][]);
};

const FeedbackSection = () => {

  const chunkedData = chunkArray(dummyData, 3);


  return (
    <div className="">
      <Swiper
        spaceBetween={30}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
          // navigation={true}
          modules={ [EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
          >
          {/* Slide 1 */ }
        {chunkedData.map((group: { name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }[], index: Key | null | undefined) => (
            <SwiperSlide key={index}>
              <div className="container px-6 py-10 mx-auto">
                <h1 className="text-2xl font-semibold text-center lg:text-3xl">explore our <br /> awesome <span className="text-blue-500">Components</span></h1>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.map((item: { name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                    <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl">

                      <img
                        className="rounded-full"
                        src={userImage}
                        width={50}
                        height={50}
                        alt="user-profile"
                      />

                      <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">{item.name}</h1>

                      <p className="text-gray-500 dark:text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                      </p>

                      <a href="#" className="flex items-center -mx-1 text-sm text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                        <span className="mx-1">read more</span>
                        <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}


      </Swiper>
    </div >
  );
};

export default FeedbackSection;
