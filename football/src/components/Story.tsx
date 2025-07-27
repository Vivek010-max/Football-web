"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../components/ui/tracing-beam";

export function Story() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p className={twMerge("font-sans text-xl mb-4")}>
              {item.title}
            </p>

            <div className="text-sm prose prose-sm dark:prose-invert">
              {item?.image && (
                <img
                  src={item.image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const dummyContent = [
  {
    title: "RashFord to FC Barcelona on Loan",
    description: (
      <>
    <p>
  
    </p>
    
    <p>
   
    </p>


      </>
    ),
    badge: "",
    image:
      "https://media.gettyimages.com/id/2226680011/photo/barcelona-spain-marcus-rashford-of-fc-barcelona-holds-up-his-shirt-during-the-unveiling-of.jpg?s=612x612&w=0&k=20&c=uLVhy-EZE7zctM1q1XG6al7MRrE0OPoZ5SG9tD70weA=",
  },
  {
    title: "Mbappe to Take Number 10 at Real Madrid",
    description: (
      <>
        <p>
          
        </p>
        <p>
         
        </p>
      </>
    ),
    badge: "Changelog",
    image:
      "https://media.gettyimages.com/id/2169787207/photo/madrid-spain-kylian-mbappe-of-real-madrid-celebrates-scoring-his-teams-first-goal-during-the.jpg?s=612x612&w=0&k=20&c=yAhQKazOLbqidQ5PCoJ5kIhPGNza1Z5tcvSOsjPMcME=",
  },
  {
    title: "PSG Lift UCL 2025 in Munich",
    description: (
      <>
        <p>
          
        </p>
      </>
    ),
    badge: "Launch Week",
    image:
      "https://media.gettyimages.com/id/2218000941/photo/munich-germany-marquinhos-of-paris-saint-germain-lifts-the-uefa-champions-league-trophy-after.jpg?s=612x612&w=0&k=20&c=XG6E1StKbu60rQGc7770NVs8rO3nK1HIKihRNHBdfhg=",
  },
];
