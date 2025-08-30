import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export function CarouselDemo() {
  return (
    <Carousel className="w-[95%] max-w-7xl mx-auto pb-5 md:pb-10 lg:pb-20">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card className="p-0 overflow-hidden w-full">
              <Image
                src="/assets/offer.jpg"
                alt={`Slide ${index + 1}`}
                width={2327}  // set the actual width of your image
                height={720}  // set the actual height of your image
                className="w-full h-auto object-contain"
                priority={index === 0}
              />
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-2 sm:left-4" />
      <CarouselNext className="right-2 sm:right-4" />
    </Carousel>
  )
}