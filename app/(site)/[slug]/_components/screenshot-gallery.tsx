"use client";

import * as React from "react";
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ScreenshotGalleryProps {
  screenshots: string[];
  title: string;
}

export function ScreenshotGallery({ screenshots, title }: ScreenshotGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  // Normalisasi path image jika berasal dari backend storage
  const resolveUrl = (path: string): string => {
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
      return path;
    }
    return `/storage/${path}`;
  };

  const currentImage = resolveUrl(screenshots[selectedIndex]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div
        onClick={() => setIsOpenModal(true)}
        className="group relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-border/80 bg-muted/40 shadow-xl cursor-zoom-in transition-all duration-300 hover:border-cyan-500/50"
      >
        <img
          src={currentImage}
          alt={`${title} - Cuplikan layar ${selectedIndex + 1}`}
          className="size-full object-cover sm:object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/90 text-foreground text-xs font-medium shadow-lg backdrop-blur-md">
            <Maximize2 className="size-3.5 text-cyan-400" />
            Klik untuk memperbesar
          </span>
        </div>

        {/* Index counter badge */}
        <div className="absolute bottom-3 right-3 rounded-md bg-black/60 backdrop-blur-md px-2 py-1 text-[11px] font-mono text-white/90">
          {selectedIndex + 1} / {screenshots.length}
        </div>

        {/* Nav arrows on main preview if > 1 screenshot */}
        {screenshots.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Lihat cuplikan sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-background/80 hover:bg-background text-foreground flex items-center justify-center shadow-md backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Lihat cuplikan berikutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-background/80 hover:bg-background text-foreground flex items-center justify-center shadow-md backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails row */}
      {screenshots.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {screenshots.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={cn(
                  "relative aspect-16/10 w-24 shrink-0 overflow-hidden rounded-xl border transition-all cursor-pointer",
                  isSelected
                    ? "border-cyan-500 ring-2 ring-cyan-500/30 opacity-100 scale-102"
                    : "border-border/60 opacity-60 hover:opacity-100 hover:border-muted-foreground/40"
                )}
              >
                <img
                  src={resolveUrl(item)}
                  alt={`Thumbnail ${idx + 1}`}
                  className="size-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {isOpenModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpenModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in-0 duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center justify-center"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsOpenModal(false)}
              className="absolute -top-12 right-0 size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <img
              src={currentImage}
              alt={`${title} fullscreen`}
              className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
            />

            <div className="mt-4 flex items-center justify-between w-full text-white/80 text-xs font-mono">
              <span>{title}</span>
              <div className="flex items-center gap-2">
                {screenshots.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePrev}
                      className="text-white hover:bg-white/10 size-8 p-0"
                    >
                      <ChevronLeft className="size-4" />
                    </Button>
                    <span>
                      {selectedIndex + 1} / {screenshots.length}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleNext}
                      className="text-white hover:bg-white/10 size-8 p-0"
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScreenshotGallery;
