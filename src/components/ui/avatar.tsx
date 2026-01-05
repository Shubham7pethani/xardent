import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Avatar({ className, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <img
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  );
}
