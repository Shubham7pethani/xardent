import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Sparkles, Users, Zap, Target, Layers } from 'lucide-react';

interface DesignApproachProps {
  title?: string;
  subtitle?: string;
  badge?: string;
}

const DesignApproach: React.FC<DesignApproachProps> = ({
  title = "Our Design Approach",
  subtitle = "We craft intuitive, scalable interfaces that drive business outcomes and delight users",
  badge = "UI/UX Design"
}) => {
  const principles = [
    {
      icon: Target,
      title: "User-Centric Research",
      description: "Deep dive into user behavior, pain points, and goals to inform every design decision",
      highlights: [
        "User interviews & surveys",
        "Competitive analysis",
        "Journey mapping"
      ]
    },
    {
      icon: Layers,
      title: "Strategic Design Systems",
      description: "Build scalable, consistent design systems that accelerate development and maintain brand integrity",
      highlights: [
        "Component libraries",
        "Design tokens",
        "Documentation"
      ]
    },
    {
      icon: Zap,
      title: "Rapid Prototyping",
      description: "Validate ideas quickly with interactive prototypes before committing to development",
      highlights: [
        "High-fidelity mockups",
        "Interactive prototypes",
        "Usability testing"
      ]
    },
    {
      icon: Users,
      title: "Collaborative Iteration",
      description: "Work closely with stakeholders and developers to refine designs through continuous feedback",
      highlights: [
        "Design reviews",
        "Developer handoff",
        "Iterative refinement"
      ]
    }
  ];

  const outcomes = [
    "Reduced user friction by 40% on average",
    "Increased conversion rates through optimized flows",
    "Faster time-to-market with design systems",
    "Enhanced brand consistency across platforms",
    "Improved accessibility compliance (WCAG 2.1)",
    "Scalable solutions for enterprise growth"
  ];

  return (
    <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge 
            variant="outline" 
            className="mb-4 px-4 py-1.5 text-sm font-medium border-primary/20 text-primary"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 inline-block" />
            {badge}
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <Card 
                key={index}
                className="p-8 border-slate-200 bg-white hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {principle.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {principle.description}
                    </p>
                    <ul className="space-y-2 pt-2">
                      {principle.highlights.map((highlight, idx) => (
                        <li 
                          key={idx}
                          className="flex items-center text-sm text-slate-600"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Outcomes Section */}
        <Card className="p-8 sm:p-12 bg-white border-slate-200 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
              Proven Results
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {outcomes.map((outcome, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                >
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 leading-relaxed">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Process Timeline */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-12 text-center">
            Our Design Process
          </h3>
          <div className="relative grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: "01", title: "Discover", desc: "Research & strategy" },
              { step: "02", title: "Design", desc: "Wireframes & mockups" },
              { step: "03", title: "Prototype", desc: "Interactive testing" },
              { step: "04", title: "Deliver", desc: "Handoff & support" }
            ].map((phase, index) => (
              <div 
                key={index}
                className="relative flex flex-col items-center text-center"
              >
                {/* Connecting Line */}
                {index < 3 && (
                  <div className="hidden sm:block absolute top-8 left-[calc(50%+2rem)] w-full h-[1px] bg-slate-200 -z-10" style={{ width: 'calc(100% - 4rem)' }} />
                )}
                
                {/* Circle with Number */}
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-900 font-bold text-lg border border-slate-200">
                  {phase.step}
                </div>
                
                {/* Title */}
                <h4 className="text-lg font-bold text-slate-900 mb-1">
                  {phase.title}
                </h4>
                
                {/* Subtitle */}
                <p className="text-sm text-slate-600">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignApproach;

