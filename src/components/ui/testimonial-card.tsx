import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
}

export function TestimonialCard({
  author,
  text,
  href,
  className,
}: TestimonialCardProps) {
  const Comp = href ? "a" : "div";

  return (
    <Comp
      {...(href ? { href } : {})}
      className={cn(
        "flex max-w-[320px] flex-col rounded-2xl border border-slate-200",
        "bg-gradient-to-b from-slate-50 to-white",
        "p-4 text-start transition-colors duration-300 sm:p-6",
        "hover:from-slate-100 hover:to-white",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none text-slate-950">
            {author.name}
          </h3>
          <p className="text-sm text-slate-600">{author.handle}</p>
        </div>
      </div>

      <p className="sm:text-md mt-4 text-sm leading-relaxed text-slate-600">
        {text}
      </p>
    </Comp>
  );
}
