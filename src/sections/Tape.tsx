import StarIcon from "@/assets/icons/star.svg";
import {Fragment} from "react";
const words = [
    "Performant",
    "Accessible",
    "Secure",
    "Interactive",
    "Scalable",
    "User Friendly",
    "Loads Fast",
    "Customizable",
    "Maintainable",
    "Responsive",
    "Search Optimized",
    "Usable",
    "Reliable",
];

export const TapeSection = () => {
  return(
      <div className="py-16 lg:py-24 overflow-x-clip">
          <div className="bg-gradient-to-r from-emerald-600 to-sky-700 -rotate-3 -mx-1">
              <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                  <div className="flex flex-none gap-4 pr-4 py-3 animate-move-left [animation-duration:30s]">

                      {[...new Array(2)].fill(0).map((_, index) => (
                          <Fragment key={index}>
                              {words.map(word => (
                                  <div key={word} className="inline-flex gap-4 items-center">
                                      <span className="text-white/80 uppercase font-extrabold text-sm">
                                          {word}
                                      </span>
                                      <StarIcon className="size-6 text-white/70 -rotate-12" />
                                  </div>
                              ))}
                          </Fragment>
                      ))}

                  </div>
              </div>
          </div>
      </div>
  );
};
