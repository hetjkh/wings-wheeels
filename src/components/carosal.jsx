import * as React from "react"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export function CarouselDemo({ slides = [] }) {
  // Filter out any invalid slides and ensure we have valid data
  const validSlides = React.useMemo(() => 
    slides
      .filter(slide => slide?.backgroundImage)
      .map(slide => ({
        ...slide,
        // Ensure backgroundImage is a string and not empty
        backgroundImage: String(slide.backgroundImage || '').trim()
      }))
      .filter(slide => slide.backgroundImage),
    [slides]
  );

  // Don't render if no valid slides
  if (validSlides.length === 0) {
    return null;
  }

  // Check if we have multiple slides
  const hasMultipleSlides = validSlides.length > 1;

  // Enhanced carousel options
  const carouselOptions = React.useMemo(() => ({
    loop: hasMultipleSlides,
    align: 'start',
    skipSnaps: true,
    dragFree: !hasMultipleSlides,
    containScroll: 'trimSnaps',
    watchDrag: hasMultipleSlides,
    inViewThreshold: 0.5,
  }), [hasMultipleSlides]);

  return (
    <div className="w-full overflow-hidden relative">
      <Carousel 
        className="w-[95%] max-w-7xl mx-auto pb-5 md:pb-10 lg:pb-20"
        opts={carouselOptions}
      >
        <CarouselContent className="ml-0">
          {validSlides.map((slide, index) => (
            <CarouselItem key={`${slide.id || 'slide'}-${index}`} className="pl-0">
              <Card className="p-0 overflow-hidden w-full border-0 shadow-none bg-transparent">
                <div className="relative w-full aspect-video">
                  <Image
                    src={slide.backgroundImage}
                    alt={slide.title || `Slide ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index < 2} // Only preload first 2 images
                    sizes="(max-width: 768px) 100vw, 1200px"
                    onError={(e) => {
                      // Fallback to a solid color if image fails to load
                      const target = e.target;
                      target.onerror = null;
                      target.src = 'https://res.cloudinary.com/dvrko1y0a/image/upload/v1755493185/int-5_mq3dio.avif';
                      target.style.objectFit = 'contain';
                      target.classList.add('bg-gray-100');
                    }}
                  />
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {hasMultipleSlides && (
          <>
            <CarouselPrevious className="left-2 sm:left-4" />
            <CarouselNext className="right-2 sm:right-4" />
          </>
        )}
      </Carousel>
    </div>
  );
}