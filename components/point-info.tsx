"use client";

import { pointSystem } from "@/lib/sports-data";
import { Info } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function PointInfo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="points" className="border rounded-xl px-4">
        <AccordionTrigger className="text-sm font-medium py-3">
          <span className="flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            배점표 보기
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="pb-3 space-y-2">
            <div className="grid grid-cols-5 gap-2 text-xs font-medium text-muted-foreground border-b pb-2">
              <span>종목</span>
              <span className="text-center">1위</span>
              <span className="text-center">2위</span>
              <span className="text-center">3위</span>
              <span className="text-center">4위</span>
            </div>
            {Object.entries(pointSystem).map(([name, points]) => (
              <div
                key={name}
                className="grid grid-cols-5 gap-2 text-xs items-center"
              >
                <span className="font-medium">{name}</span>
                <span className="text-center text-amber-600 font-bold">
                  {points.first}
                </span>
                <span className="text-center text-gray-500 font-bold">
                  {points.second}
                </span>
                <span className="text-center text-orange-500 font-bold">
                  {points.third}
                </span>
                <span className="text-center text-gray-400">
                  {points.fourth || "-"}
                </span>
              </div>
            ))}
            <p className="text-xs text-muted-foreground pt-2 border-t">
              총점: 1,000점 | 모든 학생 1인 1종목 이상 출전
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
