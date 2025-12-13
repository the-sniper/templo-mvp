import React from 'react';
import { BookOpen, Sparkles, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ShareButton from '@/components/ShareButton';

export interface TempleHistoryData {
  originStory?: string;
  deitySignificance?: string;
  famousMiracles?: string[];
  pastKumbabishekams?: { year: number; description: string }[];
  famousPoojas?: string[];
  architecturalSignificance?: string;
}

interface TempleHistoryProps {
  history: TempleHistoryData;
  templeName: string;
  templeId: string;
}

const TempleHistory: React.FC<TempleHistoryProps> = ({ history, templeName, templeId }) => {
  if (!history) return null;

  const hasContent = history.originStory || history.deitySignificance || 
    (history.famousMiracles && history.famousMiracles.length > 0) ||
    (history.pastKumbabishekams && history.pastKumbabishekams.length > 0);

  if (!hasContent) return null;

  return (
    <section>
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-foreground">History & Significance</h2>
        </div>
        <ShareButton
          title={`${templeName} - History`}
          text={`Learn about the rich history and significance of ${templeName} 🙏`}
          url={`${window.location.origin}/temple/${templeId}`}
          variant="ghost"
          size="sm"
          showLabel={false}
        />
      </div>
      <div className="rounded-2xl bg-muted/30 p-4 sm:p-6">
        <Accordion type="multiple" className="w-full">
          {history.originStory && (
            <AccordionItem value="origin" className="border-b-0">
              <AccordionTrigger className="text-left hover:no-underline py-4 rounded-xl hover:bg-muted/50 px-3 -mx-3">
                <span className="flex items-center gap-2 font-medium">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Origin Story
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-3">
                <p className="text-muted-foreground leading-relaxed">{history.originStory}</p>
              </AccordionContent>
            </AccordionItem>
          )}

          {history.deitySignificance && (
            <AccordionItem value="deity" className="border-b-0">
              <AccordionTrigger className="text-left hover:no-underline py-4 rounded-xl hover:bg-muted/50 px-3 -mx-3">
                <span className="flex items-center gap-2 font-medium">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Deity Significance
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-3">
                <p className="text-muted-foreground leading-relaxed">{history.deitySignificance}</p>
              </AccordionContent>
            </AccordionItem>
          )}

          {history.famousMiracles && history.famousMiracles.length > 0 && (
            <AccordionItem value="miracles" className="border-b-0">
              <AccordionTrigger className="text-left hover:no-underline py-4 rounded-xl hover:bg-muted/50 px-3 -mx-3">
                <span className="flex items-center gap-2 font-medium">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Famous Miracles
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-3">
                <ul className="space-y-2">
                  {history.famousMiracles.map((miracle, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary font-bold">•</span>
                      {miracle}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          {history.famousPoojas && history.famousPoojas.length > 0 && (
            <AccordionItem value="poojas" className="border-b-0">
              <AccordionTrigger className="text-left hover:no-underline py-4 rounded-xl hover:bg-muted/50 px-3 -mx-3">
                <span className="flex items-center gap-2 font-medium">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Famous Poojas & Rituals
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-3">
                <div className="flex flex-wrap gap-2">
                  {history.famousPoojas.map((pooja, index) => (
                    <Badge key={index} variant="secondary" className="rounded-full">{pooja}</Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {history.pastKumbabishekams && history.pastKumbabishekams.length > 0 && (
            <AccordionItem value="kumbabishekam" className="border-b-0">
              <AccordionTrigger className="text-left hover:no-underline py-4 rounded-xl hover:bg-muted/50 px-3 -mx-3">
                <span className="flex items-center gap-2 font-medium">
                  <Calendar className="h-4 w-4 text-primary" />
                  Past Kumbabishekams
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-3">
                <div className="space-y-3">
                  {history.pastKumbabishekams.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Badge variant="outline" className="shrink-0 rounded-full">{event.year}</Badge>
                      <p className="text-muted-foreground">{event.description}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {history.architecturalSignificance && (
            <AccordionItem value="architecture" className="border-b-0">
              <AccordionTrigger className="text-left hover:no-underline py-4 rounded-xl hover:bg-muted/50 px-3 -mx-3">
                <span className="flex items-center gap-2 font-medium">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Architectural Significance
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-3">
                <p className="text-muted-foreground leading-relaxed">{history.architecturalSignificance}</p>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </section>
  );
};

export default TempleHistory;