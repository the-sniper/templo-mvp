import React from 'react';
import { BookOpen, Sparkles, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="border-border bg-card">
      <CardHeader className="border-b border-border bg-accent/50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 font-serif text-xl">
            <BookOpen className="h-5 w-5 text-primary" />
            Temple History & Significance
          </CardTitle>
          <ShareButton
            title={`${templeName} - History`}
            text={`Learn about the rich history and significance of ${templeName} 🙏`}
            url={`${window.location.origin}/temple/${templeId}`}
            variant="ghost"
            size="sm"
            showLabel={false}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Accordion type="multiple" className="w-full">
          {history.originStory && (
            <AccordionItem value="origin">
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Origin Story
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">{history.originStory}</p>
              </AccordionContent>
            </AccordionItem>
          )}

          {history.deitySignificance && (
            <AccordionItem value="deity">
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Deity Significance
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">{history.deitySignificance}</p>
              </AccordionContent>
            </AccordionItem>
          )}

          {history.famousMiracles && history.famousMiracles.length > 0 && (
            <AccordionItem value="miracles">
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Famous Miracles
                </span>
              </AccordionTrigger>
              <AccordionContent>
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
            <AccordionItem value="poojas">
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Famous Poojas & Rituals
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2">
                  {history.famousPoojas.map((pooja, index) => (
                    <Badge key={index} variant="secondary">{pooja}</Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {history.pastKumbabishekams && history.pastKumbabishekams.length > 0 && (
            <AccordionItem value="kumbabishekam">
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Past Kumbabishekams
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {history.pastKumbabishekams.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Badge variant="outline" className="shrink-0">{event.year}</Badge>
                      <p className="text-muted-foreground">{event.description}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {history.architecturalSignificance && (
            <AccordionItem value="architecture">
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Architectural Significance
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">{history.architecturalSignificance}</p>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default TempleHistory;
